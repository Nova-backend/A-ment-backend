const mongoose = require('mongoose');

const PaymentDetails =  mongoose.Schema({
    phone_number: {
        type:Number,
        required:true
    },
    amount: {
        
            type:Number,
            required:true
        
    },
    email:{
        type:String,
        required:true
    }
})
module.exports.PaymentDetails = mongoose.model("payload", PaymentDetails)