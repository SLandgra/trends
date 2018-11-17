import React, { Component } from 'react';
import io from 'socket.io-client';
import Game from '../components/Game.js';
import AllRooms from '../components/AllRooms.js';


class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {
      socket: io('http://localhost:3000/main'),
      users: 0,
      page: 'allRooms'
    }
  }
  buttonClick(){
    if(this.state.roomInput){
      this.state.socket.emit('createRoom', this.state.roomInput)
      this.setState({roomInput:''})
    }
  }
  handleChange(event){
    this.setState({roomInput:event.target.value})
  }
  handlePages(value){
    switch (value) {
      case 'game':
        return <Game setChat={(that)=>{this.createListenerChat(that)}} socket={this.state.socket} changePage={this.changePage}/>
      default:
        return <AllRooms users={this.state.users} socket={this.state.socket} changePage={this.changePage}/>
    }
  }
  changePage = (value) => {
    this.setState({
      page: value
    })
  }
  componentDidMount(){
    const that = this;
    const socket = this.state.socket;
    socket.on('connect', ()=> {
      socket.on('return', (something)=>{
        console.log(something)
      });
      socket.on('users', (users)=>{
        that.setState({users})
      })
    });
  }
  render(){
    return(
      <div>
        {this.handlePages(this.state.page)}
      </div>
    )
  }
}


export default Lobby;
