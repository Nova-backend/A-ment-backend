
 const io = require("socket.io").listen(3000)
io.on('connection', socket => {
   console.log("new user");
   socket.emit("chat-message", "Welcome! Chat with us"); 
})
module.exports = io