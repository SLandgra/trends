import React, { Component } from 'react';
import '../css/TeamView.css';

class TeamView extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'allRooms',
      input:''
    }
  }

  handleChange(event){
    this.setState({input:event.target.value})
  }
  handleTeamName(){
    if(this.props.teamName){
      return this.props.teamName
    }else{
      return this.props.color.toUpperCase()
    }
  }
  componentDidMount(){
  }
  render(){
    return(
      <div className="TeamView">
        <div className="colorBox"
        style={{
          'backgroundColor': this.props.color ==='red'? '#F96D50' : '#5058F9'
        }}>
          <p>Team {this.handleTeamName()}</p>
        </div>
      </div>
    )
  }
}


export default TeamView;
