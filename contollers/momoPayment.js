import Flutterwave from 'flutterwave-node-v3'
import { PaymentDetails } from '../models/momoPaymentModel'
import { User } from '../models/userModel'
import { pick } from 'lodash'
const flutterwave = new Flutterwave(
    process.env.FLW_PUBLIC_KEY, 
    process.env.FLW_SECRET_KEY
)
export function momoPayment() {
    return async(req,res) => {
        let order = pick(req.body, [ "phone_number", "PaymentType"]);
        order.tx_ref = "amt_tx_ref" + Math.floor(Math.random()*1000000000 + 1);
        order.order_id = "amt_order_id" + Math.floor(Math.random()*1000000000 + 1);
        console.log(order.tx_ref);
        console.log(order.order_id);
        let url;
        url = `http:localhost:${process.env.PORT}`;
  
  let user = await User.findById(req.params.id);

  if (!req.body.phone_number) {
    return res.status(400).send("Mobile money phone number is required");
  }
   const payloadBody = new PaymentDetails({

    order_id :null,
    tx_ref: null,
    phone_number:req.body.phone_number,
    amount: req.body.amount,
    currency: 'RWF',
    email:"divineingabire69@gmail.com",
    redirect_url:`${url}/paymentDone`,
    payment_options:"mobilemoneyrwanda",
    
    payment_type:req.body.payment_type,
    meta: {
        customer_id: req.params.id,
        customer_ip:req.ip,
        reason:"payment"
    },
   fullname:"divine",
   customisations: {
    title:"A_ment backend",
    description:"Thanks for completeting your payment with A_ment"
   }
})

try{
    
  await payloadBody.save();   
 if(req.body.payment_type == "mobilemoneyrw"){
payloadBody.tx_ref = order.tx_ref;
payloadBody.order_id = order.order_id;

const momo_response = await flutterwave.MobileMoney.rwanda(payloadBody);
if(momo_response.status == "success"){
    return res.status(200).send({
        message:"Click on this link to complete payment",
        url: `${momo_response.meta.authorization.redirect}`,
    })
}else{
   const response = await flutterwave.Misc.bvn({bvn: "123456789010"})
        console.log("The response is : ", response);
        
        return res.status(400).send("Something went wrong! Please try again");
}
 }
    return res.status(200).send({message: "Service paid"})
}
catch(error){
    res.status(400).send(error);
}
}
}
