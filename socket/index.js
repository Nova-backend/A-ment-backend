// const io = require('socket.io')(3000, {
//     cors: {
//       origin: '*',
//     }
//   });

// io.on('connection', socket=>{
    
//     socket.emit('chat-message', "Welcome! Chat with us")
   
// })
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(3000, () => {
    console.log('Listining on 3000');
}); // wrong

server.listen(3000, () => {
    console.log('Listining on 3000');
}); // correct