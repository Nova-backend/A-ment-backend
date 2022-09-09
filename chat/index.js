
  const express = require('express');
  const app = express();
  const server = require('http').createServer(app);
  const socketio = require('socket.io')

  const io = socketio(server);

   server.listen(3000)
io.on('connection', socket => {
   console.log("new user");
   socket.emit("chat-message", "Welcome! Chat with us"); 
})
