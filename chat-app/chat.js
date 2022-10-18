
module.exports.chatting = () =>{
    return async(req,res) =>{   
let ejs = require('ejs');
const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const server = app.listen(process.env.port,)
app.use("/static", express.static('./static/'));

const io  = require("socket.io")(server, {
    cors : {
        origin : "*",
        // method:["POST","GET"]
    }
})

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('chat');
  });
const Chat = require('../models/chatModel')
// const users = {};

  app.get('/', (req, res) => {
    Chat.find({}).then(messages => {
      res.render('chat', {messages});
    }).catch(err => console.error(err));
  });
console.log("ewrtyuiopuytr");
 await  io.on('connection', socket => {
  socket.on('chat', data => {
    Chat.create({name: data.handle, message: data.message}).then(() => {
      io.sockets.emit('chat', data); // return data
    }).catch(err => console.error(err));
    console.log(data);
    
  });
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data); // return data
});
socket.on("addUser", (data)=>{
    addUser(data,socket.id);
    socket.broadcast.emit("getUsers",users)
    getUser(socket.id);
})
});
  
const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId && 
   users.push({userId,socketId})
   )
   console.log(users);
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId
    )
}

io.on("disconnection", () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    removeUser(socket.id)
})
    }
}

