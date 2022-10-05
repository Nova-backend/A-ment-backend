const { 
    signup,
    deleteUser, 
    updateUser,
     getUser ,
     login,
     forgotPassword
    } = require('../contollers/userInfo.js')
const {createAppointment} = require('../contollers/appointmentContoller')
const { verifyToken } = require('../auth/user')
const { User } = require('../models/userModel.js')
const passport = require('passport')

const express = require('express')

const router = express.Router()
router.post('/signup', signup())  
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())
router.post('/login',login())
router.put('/forgotpassword', forgotPassword())
router.post('/createAppointment', createAppointment())

module.exports = (app)=>{
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email']
    }))
    app.get('/auth/google/callback',passport.authenticate('google'));
    app.get('api/logout',(req,res)=>{
        req.logout();
        res.send(req.user);
    });
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    })
}

module.exports = router;