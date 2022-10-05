// const { StreamingQuerystring } = require('formidable/parsers');
const mongoose = require('mongoose');
const Appointment = mongoose.Schema({
    service:{
        type:String,
        required:true,
    },
    clientName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    duration:{
        typpe:Date,
        required:true
    }
})
module.exports.appointment = mongoose.model('appointment',Appointment);
