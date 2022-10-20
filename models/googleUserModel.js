const mongoose = require('mongoose');
const { registerSchema}  = require('swaggiffy');
const joi = require('joi')
const { string, number }  = require('joi')
const Usergoogle = mongoose.Schema({
    full_name: {
        type: String,     
    },
    userName:{
        type:String,
    },
    email:{
        type: String,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        unique:true
    },
    image:{
        type:String, 
    },
    contact:{
        type:Number,
    },
    employees : [{
        fullname:{
           type:String,
        },
        position:{
            type:String,
        },
        workingHours: {
            type:Date,
        },
        workingDays: {
            type: String,
           enum: [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
        ],
        
    },
     }],
    servicesOffered:[{
        digitalisedService:{
            type:String
            
        },
        unDigitalisedService:{
            type:String
        }
    }],
    bio:{
        type:String,
        
    },
    googleId:String
})

// const OTP = mongoose.Schema({
//     OTP : {
//         type: String,
//         required: true
//     }, 
//     email:{
//         type: String,
//         required: true
//     }
// })

// module.exports.validating = validation
module.exports.Usergoogle = mongoose.model('usergoogle', Usergoogle)
// module.exports.Otpmodel = mongoose.model('OTP', OTP)
registerSchema('usergoogle', Usergoogle);
