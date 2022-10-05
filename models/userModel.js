const mongoose = require('mongoose')

const joi = require('joi')
const { string, number }  = require('joi')
const User = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true  
    },
    contact:{
        type:Number,
        required:true
    },
    employees : [{
        fullname:{
           type:String,
           required:true
        },
        position:{
            type:String,
            required:true,
        },
        workingHours: {
            type:Date,
            required:true,
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
const validation = (data)=>{
     data = new joi.object({
        fullName: joi.string().required().min(4),
        userName:joi.string().required(),
        email: joi.string().required().email(),
        password: joi.stringrs().required()
    })
    return data.validate()
}

const OTP = mongoose.Schema({
    OTP : {
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }
})
module.exports.validation = validation
module.exports.User = mongoose.model('user', User)
module.exports.OTPmodel = mongoose.model('OTPs', OTP)