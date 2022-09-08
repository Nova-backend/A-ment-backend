var socket=io('http://localhost:3000')
 
// connection with server
socket.on('connect', function(){
  console.log('Connected to Server')
 
});
 
// message listener from server
socket.on('newMessage', function(message){
 console.log(message);
});
 
// emits message from user side
socket.emit('createMessage', {
  to:'john@ds',
  text:'what kjkljd'
});
 
// when disconnected from server
socket.on('disconnect', function(){
  console.log('Disconnect from server')
});