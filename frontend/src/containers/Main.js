import React, { Component } from 'react';

const Main = props => (
  <div>
    GOOGLE TRENDS
    <p>The family favorite trend game powered by the internet!</p>
    <button onClick = {()=>props.buttons('lobby')}> Find a game </button>
    <button> Rules </button>
  </div>
)


export default Main;
