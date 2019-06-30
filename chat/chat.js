const socket = require('socket.io');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (server) => {

  const io = socket(server);

  io.on('connection', (socket) => {
    console.log(`User connected.`);
    Message.find({}, (err, messages) => {
      socket.emit('chatHistory', messages);
    });
    socket.on('chat', (data) => {
      new Message({
        userID: data.userID,
        userName: data.userName,
        userSurname: data.userSurname,
        message: data.message
      }).save()
        .then((message) => {
          console.log('message saved successfully: ' + message);
          io.sockets.emit('chat', message);
        }
      );
    });

    socket.on('disconnect', function(){
      console.log('User disconnected');
    });
  });

}