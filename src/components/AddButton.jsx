import '../css/index.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min'
import { AwesomeButton } from "react-awesome-button";
import "../css/awesomeButtons.css";
import updateMatchTeam from '../updateMatchTeam';





export default class AddButton extends Component{
  render(){
    return (
      <AwesomeButton type={this.props.type} size={this.props.size} onPress={() => {
        let bandera = updateMatchTeam(this.props.list, this.props.users, this.props.numPlayers.num_persones)
        setTimeout(() => {
          bandera ? window.location.reload(false) : alert("You already added your TEAM or Bracket is already FULL!")
        }, 500);
      }}>
        <NavLink className="nav-link" to={this.props.linkTo} >
          {this.props.textButton}
        </NavLink>
      </AwesomeButton>
    )
  }
}