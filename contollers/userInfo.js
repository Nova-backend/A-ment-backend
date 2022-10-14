const bcrypt = require('bcrypt');
const { validation, User, OTPmodel } = require('../models/userModel.js')
const nodeMailer = require("nodemailer")
// const generateAuthTokenotpGenerator = require("otp-generator")
const _ = require("lodash")
const cloudinary = require('cloudinary')

const QueryString = require('qs')
const redirectURI = 'auth/google';
const { generateUserToken } = require('../auth/auth')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
token = generateUserToken();
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
         const user = await User.findOne({email:req.body.email})
         if(!user){
            return res.send("Invalid credentials");
         }
         if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(400).json({message:"Invalid password"});
         }
         const token = generateUserToken();
         console.log(token);
       
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

function getGoogleAuthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/auth";
    const options = {
      redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
      client_id: process.env.CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    return `${rootUrl}?${QueryString.stringify(options)}`;
  }
  
  module.exports.oAuth = () => {
    return async (req, res) => {
      res.redirect(getGoogleAuthUrl());
    };
  };
  module.exports.getGoogleUser = () => {
    return async (req, res) => {
      const code = req.query.code;
      let tokens;
      try {
        const response = await getTokens({ code });
        tokens = response;
      } catch (e) {
        console.log(e);
        return res.json({ message: "Failed to make the request" });
      }
  
      const googleUser = await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokens.id_token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        });
      await newUser(googleUser.email, googleUser.given_name, googleUser.id);
      const response = await newUser(
        googleUser.email,
        googleUser.id,
        googleUser.given_name
      );
      return res
        .status(response.statusCode)
        .json({ message: response.message, success: response.status });
    };
  };
  
  function getTokens({ code }) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: "http://localhost:4000/auth/google",
      grant_type: "authorization_code",
    };
    return axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error.response.data);
        throw new Error(error);
      });
  }
