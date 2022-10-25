
const dotenv = require("dotenv");
dotenv.config();

const fileupload = require("express-fileupload");

const express = require("express");

const bodyparser = require("body-parser");
const app = express();
// const server = http.createServer(app)
const mongoose = require("mongoose");
const router = require("./routes/routes.js");
const manageappoint = require("./routes/requestAppointRoutes");
const socket = require("socket.io");

new Swaggiffy().setupExpress(app).swaggiffy();
const cookieParser = require("cookie-parser");
const { urlencoded } = require("express");

mongoose.connect(process.env.URL).then(() => {
  console.log("Database successfully connected");
});
const PORT = process.env.PORT;

app.use(fileupload({ useTempFiles: true }));
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const io = socket(5000, {
  cors: {
    origin:process.env.ORIGIN ,
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
app.use("/", router);
app.use("/api/manage", manageappoint);
app.listen(PORT, () => {
  console.log(`The server is learning on port ${PORT}`);
});

