const Flutterwave = require('flutterwave-node-v3')
const {PaymentDetails} = require('../models/momoPaymentModel')
const flutterwave = new Flutterwave(
    process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY
)
module.exports.momoPayment = () => {
    return async(req,res) => {
   const payload = new PaymentDetails({
    phone_number: req.body.phone_number,
    amount: req.body.amount,
    currency: 'RWF',
    email:req.body.email,
    tx_ref:generateTransactionReference(),
})
flutterwave.MobileMoney.rwanda(payload)
await payload.save();
flw.Misc.bvn({bvn: "123456789010"})
    .then(response => console.log(response));
// .then(console.log(payload))
// .catch(console.log("Error!!"));
    
}
}