const bcrypt = require('bcrypt');
const { validation, User, OTPmodel } = require('../models/userModel.js')
const nodeMailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const _ = require("lodash")
const cloudinary = require('cloudinary')
const {generateAuthToken,verifyToken} = require('../auth/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


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
                            workingDays:User.workingDays,
                            workingHours:req.body.workingHours,
                        
                        },
                        servicesOffered:{
                            digitalisedService:req.body.digitalisedService,
                            unDigitalisedService:req.body.unDigitalisedService

                            
                        },
                        bio:req.body.bio
                        
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
            const updates = _.pick(req.body, [ 'userName', 'email', 'password'])
            User.findByIdAndUpdate(req.params.id, {
                userName: updates.userName,
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
module.exports.login = () => {
    return async(req,res)=>{
         const user = await user.findOne({email:req.body.email})
         if(!user){
            return res.send("Invalid credentials");
         }
         if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(400).json({message:"Invalid password"});
         }
         const token = user.generateAuthToken();
         const userProfile = await user.findOne({userId:user._id})
         res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          return res.status(200).json({
            success:true,
            message:"You successfully logged in",
            data:user,
            token:token,
            user:userProfile
          })
    }
}
module.exports.signinGoogle = () => {
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        console.log(payload);
      }
      verify().catch(console.error);
}
module.exports.forgotPassword = () =>{
    return async(req,res)=>{
        const user = await user.findOne({email:req.body.email})
        res.status(200).json({
            message:"user not found"
        })
     let userInfo = await password.findOne({email:user.email})
     if(userInfo){
       password.findOneAndUpdate({email:userInfo.email})
     }else{
        userInfo =  new password({
            email:user.email,
            OTP:OTP,
            userId : user._id
        })
        await userInfo.save();
     }
    }
}
module.exports.logout = () =>{
    return async(req,res)=>{
        User.findOneAndUpdate({_id:req.user._id}, {token : "" }, (error,doc)=>{
           if(error){
            res.status(403).json({success:false,error})
           }else{
            return res.status(200).send({success:true})
           }
        })
    }
}
