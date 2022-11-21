import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import lodash from "lodash";
const { pick } = lodash;
import { User } from "../models/user.model.js";
import Flutterwave from "flutterwave-node-v3";
import monthToText from "../utils/months.js";
import { Product } from "../models/product.model.js";
const flw = new Flutterwave(
  process.env.Flutterwave_public_key,
  process.env.Flutterwave_secret_key
);
export async function getOrders(req, res) {
  try {
    let orders = await Order.find().populate(
      "OrderedBy",
      "_id Firstname Lastname Email Phone"
    );
    if (orders.length == 0)
      return res.status(404).send("You don't have any orders yet!");
    return res.send({ status: 200, message: "ok", data: orders });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}


export async function orderStatistics(req, res) {
  try {
    let orders = await Order.find();
    if (orders.length == 0)
      return res.status(200).send("You don't have any orders yet!");
    var ordersStats = [];
    orders.map((order) => {
      let date = new Date(order.OrderedAt);
      let month = monthToText[date.getMonth()];
      let year = date.getFullYear().toString();
      for (let i = 0; i <= ordersStats.length; i++) {
        let creationDate = `${month}-${year}`;
        if (ordersStats[i] && ordersStats[i].month == creationDate) {
          ordersStats[i].ordersMade += 1;
          break;
        } else if (i == ordersStats.length) {
          ordersStats.push({ month: `${month}-${year}`, ordersMade: 1 });
          break;
        }
      }
    });
    return res.send({ status: 200, message: "ok", data: ordersStats });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

export async function deliverOrder(req, res) {
  try {
    let order = await Order.findById(req.params.orderId);
    if (!order)
      return res
        .status(404)
        .send("Unable to find the order with the provided id");
    order.Delivered = true;
    try {
      await order.save();
      res
        .status(200)
        .send({
          status: 200,
          message: "Delivered the order successfully",
          data: order,
        });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
}

export async function getUnservedDeliveries(req, res) {
  try {
    let orders = await Order.find({ Delivered: false });
    if (orders.length == 0)
      return res.status(200).send("You have no unserved deliveries");
    return res
      .status(200)
      .send({ message: "Unserved deliveries", orders: orders });
  } catch (ex) {
    res.status(500).send(ex.message);
  }
}

export async function createOrder(req, res) {
  try {
    let cart = await Cart.find({ AddedBy: req.user._id, CheckedOut: false });
    if (cart.length == 0)
      return res.status(404).send("You have not added any item to your cart");
    let order = new Order(pick(req.body, ["Location", "Phone", "PaymentType"]));
    const time = new Date();
    order.OrderedAt = time;
    order.OrderedBy = req.user._id;
    order.Items = cart;
    order.tx_ref = "gui_" + Math.floor(Math.random() * 1000000000000 + 1);
    let totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      totalPrice += cart[i].Price;
      await Cart.findByIdAndUpdate(cart[i]._id, { CheckedOut: true });
    }
    order.TotalPrice = totalPrice;
    let url;
    process.env.NODE_ENV == "production"
      ? (url = "https://guigozi-backend.herokuapp.com")
      : (url = `http:localhost:${process.env.PORT}`);
    let user = await User.findById(req.user._id);
    if (req.body.PaymentType == "MOMO") {
      if (!req.body.momoPhoneNumber) {
        return res.status(400).send("Mobile money phone number is required");
      }
      var paymentBody = {
        tx_ref: null,
        order_id: null,
        amount: order.TotalPrice,
        currency: "RWF",
        redirect_url: `${url}/paymentReceived`,
        payment_options: "mobilemoneyrwanda",
        meta: {
          customer_id: req.user._id,
          customer_ip: req.ip,
          reason: "buying products",
        },
        email: user.Email,
        phone_number: req.body.momoPhoneNumber,
        fullname: user.Firstname + user.Lastname,
        customizations: {
          title: "Guigozi Backend",
          description:
            "Thank you for using Guigozi. Complete your payment here inorder to purchase the selected items in cart",
          logo: "https://res.cloudinary.com/guigozi/image/upload/v1635922562/logo_dgo4df.png",
        },
      };
    }
    try {
      order.PaymentStatus = "unpaid";
      let orderData = await order.save();
      if (req.body.PaymentType == "MOMO") {
        paymentBody.tx_ref = orderData.tx_ref;
        paymentBody.order_id = orderData._id;
        let momo_response = await flw.MobileMoney.rwanda(paymentBody);
        if (momo_response.status == "success") {
          return res.status(200).send({
            message: "Redirect to the following url to complete payment",
            url: `${momo_response.meta.authorization.redirect}`,
          });
        } else {
          return res.status(400).send("Something went wrong! Please try again");
        }
      }
      return res.status(200).send({ message: "Order created successfully" });
    } catch (ex) {
      res.status(400).send(ex.message);
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
}
export async function paymentReceived(req, res) {
  try {
    let response = JSON.parse(req.query.resp);
    if (response.status != "success") {
      return res.status(400).send("Payment Failed. Please repeat the process");
    }
    let user = await User.findOne({
      Email: response.data["customer.email"],
    }).select("-Password");
    if (!user) return res.status(400).send("Unable to find the specified user");
    let order = await Order.findOne({ tx_ref: response.data.txRef });
    if (!order) return res.status(400).send("Unable to find the order");
    try {
      order = await Order.findByIdAndUpdate(
        order._id,
        { PaymentStatus: "paid" },
        { new: true }
      );
      order.Items.map(async (item) => {
        let product = await Product.findByIdAndUpdate(item.productId);
        product.numberInStock = product.numberInStock - item.Quantity;
        await product.save();
      });
      return res
        .status(200)
        .send({ message: "Paid the order successfully", data: order });
    } catch (ex) {
      return res.status.send({
        message: "Unable to pay the order",
        error: ex.message,
      });
    }
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
}
