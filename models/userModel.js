const mongoose = require('mongoose')

const joi = require('joi')
const { string }  = require('joi')
const User = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
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
    } 
 })
const validation = (data)=>{
     data = new joi.object({
        firstName: joi.string().required().min(4),
        lastName: joi.string().required().min(4),
        email: joi.string().required().email(),
        password: joi.string().required()
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