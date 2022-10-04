const { application } = require('express')
const { rearg } = require('lodash')
const { Appointment } = require('../models/appointmentModel')

module.exports.createAppointment = () => {
    return async(req,res) => {
        const appointment = new Appointment({
            service:req.body.service,
            clientName:req.body.clientName,
            date:req.body.date,
            duration:req.body.duration
        })
       
        await appointment.save();
    }
}
