import React from 'react';
import '../css/Main.css';

const Main = props => (
  <div className = "main">
    <div className = "mainContent">
      <h1>GOOGLE TRENDS</h1>
      <p>The family favorite trend game powered by the internet!</p>
      <button onClick = {()=>props.buttons('lobby')}> Find a game </button>
      <button onClick = {()=>props.buttons('rules')}> Rules </button>
    </div>
  </div>
)


export default Main;
