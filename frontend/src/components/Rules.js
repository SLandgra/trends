import React, { Component } from 'react';
// import '../css/Main.css';

const Rules = props => (
  <div className = "main">
    <div className = "mainContent">
      <h1>Rules</h1>
      <p> Google Trends the Game is played with two teams of any size (don't bother making your own team names,
      because the first round of play will determine that for you!).</p>
      <p>To win Google Trends, your team must have the most amount of points at the end of 5 rounds.</p>
      <p>Each round, a trend term will be put on the screen. Your goal is now to come up with a word with your team which
       you think will have a highest search count on Google.com</p>
       <p>Think fast though! You only have 60 seconds to submit your term.</p>
       <p>At the end of the 60 seconds, the terms from both teams will be put through Google Trends and be given a numeric number out of 100.</p>
       <p>These points are then added to each team's total score. At the end of 5 rounds, the team with the most points wins!</p>
      <button onClick = {()=>props.buttons('lobby')}> Find a game </button>

    </div>
  </div>
)


export default Rules;
