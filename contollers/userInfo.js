const bcrypt = require('bcrypt');
const{ validation, User , OTPmodel} = require("../models/userModel")
const nodeMailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const _ = require("lodash")



module.exports.signup = ()=>{
  return async (req,res)=>{
      const salt = await bcrypt.genSalt(20);
      const {error} = validation(req.boy);
      const OTP = otpGenerator.generate(8, { upperCaseAlphabets:true,specialChars:false})
     if(error){
         res.send(error)
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
     const emailDuplicate = User.findOne(req.body.email)

if(emailDuplicate){
    res.send("Sorry, the email already exists").status(400);
}
console.log("new user not registered");
     
     await newuser.save()
     await user.save()
    const messenger = nodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user:"divineingabire69@gmail.com",
            pass: "20202005"
        }
    }))

    const mailOptions = {
        to: user.email,
            from: "divineingabire69@gmail.com",
            subject: "Email verification",
            html: `
            <html>
            <h6> Hi ${user.firstName} </h6>\n
            <p> below is the verification code for your password reset request <br> This code is valid for 15 minutes</p>
             <h3>${OTP}</h3>
             </html>
            `

    }
    messenger.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log(error);

        }else{
            console.log("sent", info.response);
            res.send("Email sent successfully")
        }
    })
}
 


}
module.exports.verifyEmail = () => {
    return async (req, res) => {
        const newOTP = await OTPmodel.findOne({ OTP: req.body.OTP })
        if (!newOTP) {
            res.send('OTP validation failed')
        }
        res.status(200).send('Account registered validation successfull').redirect('/signup')
    }
}
module.exports.updateUser = () => {
    return async (req, res) => {
        try {
            const updates = _.pick(req.body, ['firstName', 'lastName', 'email', 'password'])
             User.findByIdAndUpdate(req.params.id, {
                firstName: updates.firstName,
                lastName: updates.lastName,
                email: updates.email,
                password: updates.password
            }, (err, response) => {
                if (err) {
                    console.log(err)
                   return res.send('error occured')
                } else {
                    res.json({message:'profile updated', user: updates});
                   return console.log(response)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports.deleteUser = () => {
    return async (req, res) => {
         User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Profile deleted successfully', success: true })
    }
}
module.exports.getUser = () => {
    return async (req, res) => {
        const user = await User.findById(req.body.id)
        return res.json({ user: user, success: true })
    }
}
