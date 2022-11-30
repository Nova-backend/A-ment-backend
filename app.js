const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const path = require("path");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const router = require("./routes/routes.js");

const { Swaggiffy } = require("swaggiffy");
new Swaggiffy().setupExpress(app).swaggiffy();

mongoose.connect(process.env.URL).then(() => {
  console.log("Database successfully connected");
});
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);

const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/payment", function (req, res) {
  res.render("home", {
    key: stripePublicKey,
  });
});
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
app.use("/", router);
app.listen(PORT, () => {
  console.log(`The server is learning on port ${PORT}`);
});
