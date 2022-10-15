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
const {createAppointment} = require('../contollers/appointmentContoller')
const { verifyToken } = require('../auth/auth')



const express = require('express')
const { registerDefinition, registerDefinitions } = require('swaggiffy');

const router = express.Router()

registerDefinition(router, { tags: 'user', mappedSchema: 'User', basePath: '/' });

router.post('/signup', signup())  
router.put('/signup/:id', updateUser())
router.delete('/signup/:id', deleteUser())
router.get('/signup', getUser())
router.post('/login',login())
router.put('/forgotpassword', forgotPassword())
router.post('/createAppointment', createAppointment())
router.get('/signup/google', oAuth())
router.get('/auth/google', getGoogleUser())




module.exports = router;