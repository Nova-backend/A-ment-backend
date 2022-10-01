const bcrypt = require('bcrypt');
const { validation, User, OTPmodel } = require('../models/userModel.js')
const nodeMailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const _ = require("lodash")
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// const upload = require("../utils/multer")
// const path = require('path');
// const { url } = require('inspector');

module.exports.signup = () => {
    return async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        const { error } = await validation(req.body);
        const OTP = otpGenerator.generate(8, { upperCaseAlphabets: true, specialChars: false, lowerCaseAlphabets: true })
        if (error) {
            res.send(error)
            console.log("er1", error)
        }
        try {
            // Upload image to cloudinary
            console.log("file", req.files)
            const file = req.files.image
            const result = await cloudinary.uploader.upload(file.tempFilePath);

            console.log("result",result);
            // Create new user

            bcrypt.genSalt(10, (err, salt) => {
                
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    if (err) throw (err);

                    const user = new User({
                        fullName: req.body.fullName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        image:result.url,
                        contact:req.body.contact,
                      
                        employees:{
                            fullname:req.body.fullname,
                            position:req.body.position,
                            workingDays:userModel.schema.options.enum,
                            workingHours:req.body.workingHours,
                        
                        },
                        servicesOffered:{
                            digitalisedService:req.body.digitalisedService,
                            unDigitalisedService:req.body.unDigitalisedService

                            
                        }
                        
                    });
                    await user.save()
                    const newuser = new OTPmodel({
                        OTP: OTP,
                        email: user.email
                    })
                    newuser.save();
             

          

            res.status(200)
                .send({
                    user
                });

            const emailDuplicate = user.findOne(req.body.email)

            if (emailDuplicate) {
                res.send("Sorry, the email already exists").status(400);
            }


            const messenger = nodeMailer.createTransport({
                service: 'outlook',

                auth: {
                    user: "divineingabire@outlook.com",
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
            messenger.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("er2", error);

                } else {
                    console.log("sent", info.response);
                    res.send("Email sent successfully");
                }
            })
              
        })
            })
        }


        catch (err) {
            console.log("er3", err);
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
                    res.json({ message: 'profile updated', user: updates });
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
