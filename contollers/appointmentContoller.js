
const { Appointment } = require('../models/appointmentModel')
const _ = require('lodash')
const { duration } = require('moment')
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
module.exports.updateAppointment = () =>{
    return async(res,req)=>{
        try{
            const updating = _.pick(req.body,[service,clientName,date,duration])
            Appointment.findByIdAndUpdate(req.params.id, {
                service:updating.service,
                clientName:updating.clientName,
                date:updating.date,
                duration:updating.duration
            }, (error,response) => {
                if(error){
                    console.log(error);
                    return res.send("Error occured");
                }else {
                    res.json({message : "Appointment updated", appointment:updating})
                    return console.log(response);
                }

            })
        } catch (error){
            console.log(error);
        }
    }
}
