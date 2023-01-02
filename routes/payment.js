const express = require("express");
const paymentRouter = express.Router();
const { stripePayment } = require("../contollers/cardPayment.js");
const {momoPayment} = require("../contollers/momoPayment")

paymentRouter.post("/cardPayment", stripePayment());
paymentRouter.post("/momopayment", momoPayment());
module.exports.paymentRouter = paymentRouter;
