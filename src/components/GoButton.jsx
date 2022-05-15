import '../css/index.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min'
import { AwesomeButton } from "react-awesome-button";
import "../css/awesomeButtons.css";
import updateLeagueStart from '../updateLeagueStart';





export default class GoButton extends Component{
  render(){
    return (
      <AwesomeButton type={this.props.type} size={this.props.size} onPress={() => {
        let bandera = updateLeagueStart(this.props.tournamentID, this.props.list)
        setTimeout(() => {
          bandera ? window.location.reload(false) : console.log()
        }, 500);
      }}>
        <NavLink className="nav-link" to={this.props.linkTo} >
          {this.props.textButton}
        </NavLink>
      </AwesomeButton>
    )
  }
}