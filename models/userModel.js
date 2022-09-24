const mongoose = require('mongoose')

const joi = require('joi')
const { String }  = require('joi')
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
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profile_img:{
        type: String,
        required:true
    },
    cloudinary_Id:{
        type:String,
        required:true
    }
    


})
const validation = (data)=>{
    console.log(data)
     data = new joi.object({
        firstName: joi.String().required().min(4),
        lastName: joi.String().required().min(4),
        email: joi.String().required().email(),
        password: joi.String().required()
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