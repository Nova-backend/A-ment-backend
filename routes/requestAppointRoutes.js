const express=require('express')
// const getUser  = require('../controllers/ManageController')
// const updateUser  = require('../controllers/ManageController')
// const deleteUser=require('..//controllers/ManageController')

const {deleteAppoint,findAppoint,updateAppoint,createAppointment,getAppoint}=require('../controllers/clientController')

const router=express.Router()



router.post('/create', createAppointment);
router.get('/find', findAppoint);
router.get('/display/:id',getAppoint)
router.put('/update/:id',updateAppoint);
router.delete('/delete/:id', deleteAppoint);


module.exports = router