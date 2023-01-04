const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(() => {
  console.log("Database successfully connected");
});
const {middleware} = require("./middlewares/mainMiddleware.js");
const {clientRouter} = require("./routes/client.js");
const {serviceAppointmentRouter} = require("./routes/serviceAppointments.js");
const {paymentRouter} = require("./routes/payment.js");
const {taskRouter} = require("./routes/tasks.js");
const {clientAppointmentRouter} = require("./routes/clientAppointment.js");
const {serviceProviderRouter} = require("./routes/serviceProvider.js");
const {messageRouter} = require("./routes/message.js");
const { Swaggiffy } = require('swaggiffy'); 
new Swaggiffy().setupExpress(app).swaggiffy();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);

const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const socket = require("socket.io");
const io = socket(8080, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});
//store all online users inside this map
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieved", data.message);
    }
  });
});

app.get("/", function (req, res) {
  res.send("Welcome to A_ment Backend");
});
middleware(app);
app.use("/client", clientRouter);
app.use("/serviceAppointment", serviceAppointmentRouter);
app.use("/payment", paymentRouter);
app.use("/task", taskRouter);
app.use("/clientAppointment", clientAppointmentRouter);
app.use("/serviceProvider", serviceProviderRouter);
app.use("/message", messageRouter);
app.listen(PORT, () => {
  console.log(`The server is learning on port ${PORT}`);
});
