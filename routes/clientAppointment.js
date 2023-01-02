const express = require("express");
const clientAppointmentRouter = express.Router();
const {
    deleteAppoint,
    findAppoint,
    updatedAppoint,
    createappointment,
    getAppoint,
  } = require("../contollers/clientcontrollers");
    clientAppointmentRouter.post("/create", createappointment);
    clientAppointmentRouter.get("/find", findAppoint);
    clientAppointmentRouter.get("/display/:id", getAppoint);
    clientAppointmentRouter.put("/update/:id", updatedAppoint);
    clientAppointmentRouter.delete("/delete/:id", deleteAppoint);
module.exports.clientAppointmentRouter = clientAppointmentRouter;

