const { signup } = require('../contollers/userInfo.js')
const { verifyToken } = require('../auth/user')
const { User } = require('../models/userModel.js')
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const express = require('express')

const router = express.Router()
router.post('/signup',signup())
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())
router.post('/signup', signup())  



  

module.exports = router;