const jwt = require('jsonwebtoken')

module.exports.generateAuthToken = (userId)=>{
  const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn:'15h'})
  return token;
  
}
module.exports.verifyToken = (req,res,next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_KEY)
    if(!token) {
        return res.status(401).send("you have to log in");
    }else{
        return req.token  = token
    }
    }
}