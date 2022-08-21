const { signup } = require('../contollers/useInfo')
const { verifyToken } = require('../auth/user')
const router = require('express').Router()

module.exports.Router=(app)=>{
    router.post('/signup', signup())
}