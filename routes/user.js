const { signup, deleteUser, updateUser, getUser } = require('../contollers/userInfo.js')
const { verifyToken } = require('../auth/user')
const { User } = require('../models/userModel.js')

const express = require('express')

const router = express.Router()
router.post('/signup',signup())
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())
<<<<<<< HEAD
=======
router.post('/signup', signup())  



  

>>>>>>> b1eb0b003a5a20f607857e6f4d4a2bb609d7f9f6
module.exports = router;