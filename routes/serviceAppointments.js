const express = require("express");
const {registerDefinition} = require("swaggiffy");
const serviceAppointmentRouter = express.Router();
const {
    createAppointment,
    updateAppointment,
    getAppointment,
    cancelAppointment,
  } = require("../contollers/appointmentContoller");
  serviceAppointmentRouter.post("/createAppointment", createAppointment());
serviceAppointmentRouter.put("/updateAppointment/:id", updateAppointment());
serviceAppointmentRouter.get("/getAppointment", getAppointment());
serviceAppointmentRouter.delete("/cancelAppointment/:id", cancelAppointment());
registerDefinition(serviceAppointmentRouter, {tags:'appointment', mappedSchema:'appointment',basePath:'/serviceAppointment'})
module.exports.serviceAppointmentRouter = serviceAppointmentRouter;