const express=require('express')

const {deleteAppoint,findAppoint,updateAppoint,createAppointment,getAppoint}=require('../contollers/clientcontrollers')

const router=express.Router()



router.post('/create', createAppointment);
router.get('/find', findAppoint);
router.get('/display/:id',getAppoint)
router.put('/update/:id',updateAppoint);
router.delete('/delete/:id', deleteAppoint);


module.exports = router