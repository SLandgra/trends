let rooms = [];
let users = 0;
/*
Room:{
allPlayers: Boolean
spectators: Number (if -1 No spectators allowed)
roomName: String
roomID: String
password: String
inProgress: boolean
}
*/
rooms.findByIdAndUpdateOrRemove = (id, joining) => {
  const index = rooms.findIndex((element)=>{
    return element.roomID === id
  })
  if(index === -1){
    return "Room does not exist"
  }
  if(!joining && !rooms[index].allPlayers){
    rooms.splice(index, 1);
    return "Removed Room Successfully"
  }else if(joining && rooms[index].allPlayers){
    return "Room Full"
  }else{
    rooms[index] = Object.assign(rooms[index], {allPlayers: !rooms[index].allPlayers});
    return "Room Updated"
  };
}
rooms.findByIdAndUpdateSpectator = (id, joining) => {
  const index = rooms.findIndex((element)=>{
    return element.roomID === id
  });
  const add = joining ? 1 : -1
  rooms[index] = Object.assign(rooms[index], {spectators: rooms[index].spectators + add});
}

const sockets = (io)=>{
  const main = io
  .of('/main')
  .on('connection', (socket)=>{
    users++;
    main.emit('users', users);
    socket.on('joinRoom', (room)=>{
      socket.room = room;
      socket.type = "player";
      socket.join(room);
    });
    socket.on('spectateRoom', (room)=>{
      socket.room = room;
      socket.type = "spectator";
      rooms.findByIdAndUpdateSpectator(room.roomID, true);
      socket.join(room)
    })
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
      const newRoom = {
      allPlayers: false,
      spectators: room.spectators,
      roomName: room.roomName,
      roomID: socket.id,
      password: room.password,
      inProgress: false,
      }
      rooms.push(newRoom)
      socket.emit('roomID', socket.id)
      roomSocket.emit('rooms', newRoom)
    });
  });
}

module.exports = sockets
