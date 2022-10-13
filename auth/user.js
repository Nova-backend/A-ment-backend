const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
module.exports.generateUserToken = (userId)=>{
  const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn:'7d'})

  return token;
  
}
module.exports.verifyUserToken = (req,res,next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_KEY)
    if(!token) {
        return res.status(401).send("you have to log in");
    }else{
        return req.token  = token
    }
    }
}