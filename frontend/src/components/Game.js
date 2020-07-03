import React, {Component} from 'react';
import TeamView from './TeamView';
import '../css/Game.css';
class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      chat: [],
      chatInput: '',
      name: ''
    }
  }
  handleChange(event){
    this.setState({chatInput: event.target.value})
  }
  chatSubmit(){
    if(!this.state.name){
      this.setState({name: this.state.chatInput, chatInput: ''})
    }else if(this.state.chatInput){
      this.props.socket.emit('chat', {name: this.state.name, msg:this.state.chatInput})
      this.setState({chatInput: ''});
    }
  }
  componentDidMount(){
    let that = this;
    this.props.socket.on('sendChat', (msg)=>{
      let chat = that.state.chat;
      chat.push(msg);
      that.setState({chat});
    });
  }
  render(){
    return(
      <div>
        <div className='gameContainer'>
          <TeamView
          color='red'
          teamName=''
          />
          <TeamView
          color='blue'
          teamName=''/>
        </div>
        <div className="chatBox">
          <div className="chatMessages">
            {this.state.chat.map((chat, index)=>{return <span key ={index}>{chat.name}: {chat.msg} <br></br></span>})}
          </div>
          <div className="chatInput">
            Chat <input onChange={(e)=>{this.handleChange(e)}} value = {this.state.chatInput} type = "text"/>
            <button onClick={()=>{this.chatSubmit()}}> Submit </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
