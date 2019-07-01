const socket = require('socket.io');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (server) => {

  const io = socket(server);

  io.on('connection', (socket) => {
    console.log(`User connected.`);
    Message.find({}).sort({date: 'asc'}).exec((err, messages) => {
      // console.log(messages);
      socket.emit('chatHistory', messages);
    });
    socket.on('chat', (data) => {
      new Message({
        userID: data.userID,
        nickname: data.nickname,
        message: data.message,
        date: Date.now()
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