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
        let bandera = updateMatchTeam(this.props.list)
        bandera ? window.location.reload(false) : alert("Error adding your team")
      }}>
        <NavLink className="nav-link" to={this.props.linkTo} >
          {this.props.textButton}
        </NavLink>
      </AwesomeButton>
    )
  }
}