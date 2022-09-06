const bcrypt = require('bcrypt');
const{ validation, User , OTPmodel} = require("../models/userModel")
const nodeMailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const _ = require("lodash")
const cloudinary = require('cloudinary')
const upload = require("../utils/multer")

module.exports.signup = ()=>{
  return async (req,res)=>{
      const salt = await bcrypt.genSalt(20);
      const {error} = validation(req.body);
      const OTP = otpGenerator.generate(8, { upperCaseAlphabets:true,specialChars:false, lowerCaseAlphabets:true})
     if(error){
         res.send(error)
     }
     upload.single("image"), async (req, res) => {
        try {
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
          // Create new user
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
         })
         const newuser = new OTPmodel({
            OTP:OTP,
            email: user.email
        })
        console.log("user is saved");
        await newuser.save()
        await user.save()
        console.log("it reaches here");
          res.status(200)
            .send({
              user
            });
            const emailDuplicate = User.findOne(req.body.email)

            if(emailDuplicate){
                res.send("Sorry, the email already exists").status(400);
            }
            
                 
               
                const messenger = nodeMailer.createTransport({
                    service: 'outlook',
                    
                    auth: {
                        user:"divineingabire@outlook.com",
                        pass: "divine005@"
                    }
                })
            
                const mailOptions = {
                    to: user.email,
                        from: "divineingabire@outlook.com",
                        subject: "Email verification",
                        html: `
                        <html>
                        <h6> Hi ${user.firstName} </h6>\n
                        <p> Below is the verification code for your password reset request <br> This code is valid for 15 minutes</p>
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

        } catch (err) {
          console.log(err);
        }

   
   
}
 

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
        const user = await User.findOne(req.body.id)
        return res.json({ user: user, success: true })
    }
}
