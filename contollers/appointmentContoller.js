const { Appointment, validation } = require("../models/appointmentModel");
const _ = require("lodash");
module.exports.createAppointment = () => {

  return async (req, res) => {
    const { error } = await validation(req.body);
    const appointment = new Appointment({
      service: req.body.service,
      clientName: req.body.clientName,
      date: req.body.date,
      duration: req.body.duration,
    });
    if (error) {
      res.send(error);
      console.log("error", error);
    }
    await appointment.save();
  
  };
};

module.exports.updateAppointment = () => {
  return async (req, res) => {
    try {
      const updating = _.pick(req.body, [
        "service",
        "clientName",
        "date",
        "duration",
      ]);
      Appointment.findByIdAndUpdate(
        req.params.id,
        {
          service: updating.service,
          clientName: updating.clientName,
          date: updating.date,
          duration: updating.duration,
        },
        (error, response) => {
          if (error) {
            console.log(error);
            return res.send("Error occured");
          } else {
            res.json({ message: "Appointment updated", appointment: updating });
            return console.log(response);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
module.exports.getAppointment = () => {
  return async (req, res) => {
    const appointment = await Appointment.findOne(req.body.id);
    return res.json({ appointment: appointment, success: true });
  };
};
module.exports.cancelAppointment = () => {
  return async (req, res) => {
    Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment canceled" });
  };
};
