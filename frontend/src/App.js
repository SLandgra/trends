import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lobby from './containers/Lobby.js';
import Main from './containers/Main.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'main'
    }
  }
  changePage = (value) => {
    this.setState({
      page: value
    });
  }
  handlePages(value){
    switch (value) {
      case 'lobby':
        return <Lobby buttons={this.changePage}/>
      default:
        return <Main buttons={this.changePage}/>
    }
  }
  render() {
    return (
      <div>
        {this.handlePages(this.state.page)}
      </div>
    );
  }
}

export default App;
