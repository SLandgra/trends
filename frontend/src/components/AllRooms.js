import React, {Component} from 'react';
import io from 'socket.io-client';

class AllRooms extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      roomInput: {
        roomName:'',
        password:'',
        spectators: -1
      },
      roomSocket: io('http://localhost:3000/rooms')
    }
  }
  joinRoom(room){
    this.props.socket.emit('joinRoom', room);
    this.state.roomSocket.disconnect();
    this.props.changePage('game');
  }
  spectateRoom(room){
    this.props.socket.emit('spectateRoom', room);
    this.state.roomSocket.disconnect();
    this.props.changePage('game');
  }
  handleChange(event){
    let obj = this.state.roomInput;
    obj[event.target.name] = event.target.value;
    this.setState({roomInput: obj});
  }
  createRoom(){
    if(this.state.roomInput.roomName){
      this.state.roomSocket.emit('createRoom', this.state.roomInput);
      this.setState({roomInput:{
        roomName:'',
        password:'',
        spectators: -1
      }});
    }
  }
  handleCheckbox(event){
    let obj = this.state.roomInput
    if(obj.spectators === -1){
      obj.spectators = 0;
    }else{
      obj.spectators = -1;
    }
    this.setState({roomInput: obj})
  }
  componentDidMount(){
    const that = this;
    const roomSocket = this.state.roomSocket;
    roomSocket.on('connect', () => {
      roomSocket.on('roomInit', (rooms) => {
        that.setState({rooms});
      });
      roomSocket.on('rooms', (room) => {
        let arr = that.state.rooms;
        arr.push(room);
        that.setState({rooms: arr});
      });
      roomSocket.on('roomID', (roomID) => {
        this.props.socket.emit('joinRoom', roomID);
        this.state.roomSocket.disconnect();
        this.props.changePage('game');
      })
    });
  }
  render(){
    return(
      <div>
        <h2>Number of Users online: {this.props.users} </h2>
        Create Room
        <p>
          Name
          <input onChange = {(e)=>{this.handleChange(e)}}
                value = {this.state.roomInput.roomName}
                type = "text"
                name = "roomName"/>
        </p>
        <p>
          Password
          <input onChange = {(e)=>{this.handleChange(e)}}
                 value = {this.state.roomInput.password}
                 type = "text"
                 name = "password"/>
        </p>
        <p>
          Allow Spectators
          <input type = "checkbox"
                 onChange = {(e)=>{this.handleCheckbox(e)}}
                 checked = {this.state.roomInput.spectators === -1 ? false : true}
                 name = "spectators"/>
        </p>

        <button onClick={()=>{this.createRoom()}}> Submit </button>
        <table className="table">
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Password Protected</th>
              <th>Spectators</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
        {this.state.rooms.map((room, index)=>{
          return(
            <tr key = {index}>
                    <th scope="col">{room.roomName}</th>
                    <th scope="col">{room.password? "Yes" : 'No'}</th>
                    <th scope="col">{room.spectators === -1 ? "N/A" : room.spectators}</th>
                    <th scope="col">
                      <button type="button" className="btn btn-primary" onClick = {()=>{this.joinRoom(room)}}>Join Game</button>
                      <button type="button" className="btn btn-primary" onClick = {()=>{this.spectateRoom(room)}}>Spectate Game</button>
                    </th>
                </tr>)
              })}
            </tbody>
          </table>
      </div>
    )
  }
}

export default AllRooms
