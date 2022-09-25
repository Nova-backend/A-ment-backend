const io  = require("socket.io")(8000, {
    cors : {
        origin : "http://localhost:3000"
    }
})

const users = {}


const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId && 
   users.push({userId,socketId})
   )
   console.log(users);
   
}

const removeUser = (userId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId
    )
}
io.on("connection", (socket) => {
    // socket.on("send-chat-message", message=>{
    //     socket.broadcast.emit("chat-message", {message: message, name:users[socket.id]})
    // })
    // socket.on("new-user", name => {
    //     users[socket.id] = name;
    //     socket.broadcast.emit("user connected", name)
    // })
    console.log(socket.id, "User connected");
})
io.on("disconnection", () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
})