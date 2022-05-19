import '../css/index.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min'
import { AwesomeButton } from "react-awesome-button";
import "../css/awesomeButtons.css";
import updateLeagueStart from '../updateLeagueStart';





export default class GoButton extends Component{
  constructor() {
    super();
    this.state = {
      loading: false
    };
    this.reloadButton = this.reloadButton.bind(this);
  }
  
  reloadButton = () => {
    this.setState({ loading: false });
    window.location.reload(false)
  };

  render(){
    return (
      <AwesomeButton type={this.props.type} size={this.props.size} onPress={() => {
        this.state.loading = true
        let bandera = updateLeagueStart(this.props.tournament, this.props.list, this.reloadButton)
      }}>
        <NavLink className="nav-link" to={this.props.linkTo} >
          {this.state.loading ? "Starting..." : this.props.textButton}
        </NavLink>
      </AwesomeButton>
    )
  }
}