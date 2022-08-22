const { signup } = require('../contollers/useInfo')
const { verifyToken } = require('../auth/user')
const express = require('express')

const router = express.Router()
router.post('/signup', signup())  

module.exports = router;