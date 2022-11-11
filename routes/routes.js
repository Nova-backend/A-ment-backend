const {
  signup,
  deleteUser,
  updateUser,
  getUser,
  login,
  forgotPassword,
  oAuth,
  getGoogleUser,
  verifyEmail,
} = require("../contollers/userInfo.js");
// const {chatting} = require('../chat-app/chat')
const {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
} = require("../contollers/appointmentContoller");
const { verifyToken } = require("../auth/auth");

const express = require("express");
const { registerDefinition, registerDefinitions } = require("swaggiffy");

const router = express.Router();

registerDefinition(router, {
  tags: "user",
  mappedSchema: "User",
  basePath: "/",
});
const {
  addMessage,
  getAllMessage,
  updateMessage,
  deleteMessage
} = require("../contollers/messageController");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../contollers/tasksController");
const { stripePayment } = require("../contollers/cardPayment.js");
const {momoPayment} = require("../contollers/momoPayment")
module.exports = router;
router.post("/signup", signup());
router.post("/verifyEmail", verifyEmail())
router.put("/updateUser/:id", updateUser());
router.delete("/deleteUser/:id", deleteUser());
router.get("/getUser", getUser());
router.post("/login", login());
router.put("/forgotpassword", forgotPassword());
router.post("/createAppointment", createAppointment());
router.put("/updateAppointment/:id", updateAppointment());
router.get("/getAppointment", getAppointment());
router.delete("/deleteAppointment/:id", deleteAppointment());
router.get("/signup/google", oAuth());
router.post("/signup/google", oAuth());
router.get("/auth/google", getGoogleUser());
router.post("/addMessage/", addMessage());
router.get("/getMessage/", getAllMessage());
router.put("/updateMessage/:id",updateMessage());
router.delete("/deleteMessage/:id",deleteMessage());
router.post("/createTask", createTask());
router.put("/updateTask/:id", updateTask());
router.delete("/deleteTask/:id", deleteTask());
router.get("/getTask", getTasks());
router.post("/cardPayment", stripePayment());
router.post("/momopayment", momoPayment());

module.exports = router;
