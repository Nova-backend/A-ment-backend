const { signup } = require('../contollers/useInfo')
const { signup} = require("../contollers/useInfo")
const router = require('express').Router()

module.exports.Router = (app)=>{
    router.post('/signup', signup())
}