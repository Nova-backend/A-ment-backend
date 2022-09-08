
 const io = require("socket.io/socket.io.js")

io.on('connection', (socket) => {
   console.log("new user");
   socket.emit("chat-message", "Welcome! Chat with us"); 
})
