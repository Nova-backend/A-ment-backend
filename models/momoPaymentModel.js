const { string } = require('joi');
const mongoose = require('mongoose');
const { registerSchema } = require('swaggiffy');
const PaymentDetails =  mongoose.Schema({
    phone_number: {
        type:String,
        required:true
    },
    amount: {
        
            type:Number,
            required:true
        
    },
   email: {
    type:String,
    required:true
   },
   fullname: {
    type:String,
    required:true,
   },
   currency: {
    type:String,
    required:true
   
   },

   payment_type: {
    type:String,
    required:true
   },
   order_id :{
   type:String,

   },
   tx_ref: {
    type:String,
  
   }

})
module.exports.PaymentDetails = mongoose.model("payload", PaymentDetails);
registerSchema("PaymentDetails", PaymentDetails);