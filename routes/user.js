const { signup, updateUser, deleteUser , getUser} = require('../contollers/userInfo.js')
const { verifyToken } = require('../auth/user')
const { User } = require('../models/userModel.js')
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const express = require('express')

const router = express.Router()
router.post('/signup', signup(),upload.single("image"), async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      // Create new user
      let user = new User({
        // name: req.body.name,
        profile_img: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await user.save();
      res.status(200)
        .send({
          user
        });
    } catch (err) {
      console.log(err);
    }
    })  
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())


  

module.exports = router;