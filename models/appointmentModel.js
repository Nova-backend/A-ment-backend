// const { StreamingQuerystring } = require('formidable/parsers');
const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");
const joi = require("joi");
const Appointment = mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
  },
});
const validation = (data) => {
 data = new joi.object({
  service:joi.string().required(),
  clientName:joi.string().required(),
  date:joi.date().required(),
  duration:joi.date()
 })

}

module.exports.validation = validation;
module.exports.Appointment = mongoose.model("appointment", Appointment);
registerSchema("appointment", Appointment);
registerSchema("validation", validation);