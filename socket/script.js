const express = require('express')


const app = express();
const server = http.createServer(app);
const socket = io("http://localhost:3000")(server)

socket.on("chat-message", data=>{
  console.log(data);

})


