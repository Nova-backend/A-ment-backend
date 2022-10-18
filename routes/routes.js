const { 
    signup,
    deleteUser, 
    updateUser,
     getUser ,
     login,
     forgotPassword,
     oAuth,
     getGoogleUser,
    } = require('../contollers/userInfo.js')
    const {chatting} = require('../chat-app/chat')
const {createAppointment,updateAppointment,getAppointment,deleteAppointment} = require('../contollers/appointmentContoller')
const { verifyToken } = require('../auth/auth')

const express = require('express')
const { registerDefinition, registerDefinitions } = require('swaggiffy');

const router = express.Router()

registerDefinition(router, { tags: 'user', mappedSchema: 'User', basePath: '/' });

router.post('/signup', signup())  
router.put('/updateUser/:id', updateUser())
router.delete('/deleteUser/:id', deleteUser())
router.get('/getUser', getUser())
router.post('/login',login())
router.put('/forgotpassword', forgotPassword())
router.post('/createAppointment', createAppointment())
router.put('/updateAppointment/:id', updateAppointment())
router.get('/getAppointment', getAppointment())
router.delete('/deleteAppointment/:id', deleteAppointment())
router.get('/signup/google', oAuth())
router.get('/auth/google', getGoogleUser())
router.post('/chat',chatting())

module.exports = router;