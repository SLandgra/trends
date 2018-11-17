let rooms = [];
let users = 0;

const sockets = (io)=>{
  const main = io
  .of('/main')
  .on('connection', (socket)=>{
    users++;
    main.emit('users', users);
    socket.on('joinRoom', (room)=>{
      socket.room = room;
      socket.join(room);
    });
    socket.on('leaveRoom', ()=>{
      socket.leave(socket.room);
      socket.room = '';
    });
    socket.on('disconnect', ()=>{
      if(socket.room){
        socket.leave(socket.room);
      }
      users--;
      main.emit('users', users);
    })
    socket.on('chat', (chat)=>{
      main.in(socket.room).emit('sendChat', chat);
    })
  });
  const roomSocket = io
  .of('/rooms')
  .on('connection', (socket)=>{
    socket.emit('roomInit', rooms)
    socket.on('createRoom', (room)=>{
      rooms.push(room);
      roomSocket.emit('rooms', room)
    });
  });
}

module.exports = sockets
