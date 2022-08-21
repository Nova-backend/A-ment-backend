const bcrypt = require('bcrypt');
const{ validation, User , OTPmodel} = require("../models/userModel")
const nodeMailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const _ = require("lodash")



module.exports.signup = ()=>{
  return async (req,res)=>{
      const salt = await bcrypt.genSalt(20);
      const {error} = validation(req.boy);
      const OTP = otpGenerator.generate(8, { upperCaseAlphabets:true,lowerCaseAlphabets:true,specialChars:false})
     if(error){
         res.send(error)
     }
     const emailDuplicate = User.findOne(req.body.email)

     if(emailDuplicate){
         res.send("Sorry, the email already exists");
     }
     const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
     })
     const newuser = new OTPmodel({
         OTP:OTP,
         email: user.email
     })
     await user.save()
     await newuser.save()
    }
    const messenger = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user:"divineingabire69@gmail.com",
            pass: "20202005"
        }
    })

    const message = {
        to: 
    }
}