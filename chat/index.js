const io  = require("socket.io")(8000, {
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    socket.on("send-chat-message", message=>{
        socket.broadcast.emit("chat-message", message)
    })
})
io.on("disconnection", (socket) => {
    console.log("Disconnected");
})