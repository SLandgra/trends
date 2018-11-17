import React, {Component} from 'react';
import io from 'socket.io-client';

class AllRooms extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      roomInput: '',
      roomSocket: io('http://localhost:3000/rooms')
    }
  }
  joinRoom(room){
    this.props.socket.emit('joinRoom', room);
    this.state.roomSocket.disconnect();
    this.props.changePage('game');
  }
  handleChange(event){
    this.setState({roomInput: event.target.value})
  }
  createRoom(){
    if(this.state.roomInput){
      this.state.roomSocket.emit('createRoom', this.state.roomInput);
      this.props.socket.emit('joinRoom', this.state.roomInput);
      this.setState({roomInput:''});
      this.state.roomSocket.disconnect();
      this.props.changePage('game');
    }
  }
  componentDidMount(){
    const that = this;
    const roomSocket = this.state.roomSocket;
    roomSocket.on('connect', ()=>{
      roomSocket.on('roomInit', (rooms)=>{
        that.setState({rooms});
      });
      roomSocket.on('rooms', (room)=>{
        console.log(room)
        let arr = that.state.rooms;
        arr.push(room);
        that.setState({rooms: arr});
      })
    })
  }
  render(){
    return(
      <div>
        <h2>Number of Users online: {this.props.users} </h2>
        Create Room <input onChange={(e)=>{this.handleChange(e)}} value = {this.state.roomInput} type = "text"/>
        <button onClick={()=>{this.createRoom()}}> Submit </button>
        {this.state.rooms.map((room, index)=>{return(<li key = {index}><button  onClick = {()=>{this.joinRoom(room)}}>{room}</button></li>)})}
      </div>
    )
  }
}

export default AllRooms
