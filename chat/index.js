
 const io = require("socket.io")

io.on('connection', (socket) => {
   console.log("new user");
   socket.emit("chat-message", "Welcome! Chat with us"); 
})
