import React, { Component } from 'react';


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
  componentDidMount(){
  }
  render(){
    return(
      <div style={'color:'+ this.props.color}>

      </div>
    )
  }
}


export default TeamView;
