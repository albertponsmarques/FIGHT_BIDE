import './css/index.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min'
import { AwesomeButton } from "react-awesome-button";
import "./css/awesomeButtons.css";  




export default class Boton extends Component{
  render(){
    return (
      <AwesomeButton type={this.props.type} size={this.props.size}>
        <NavLink className="nav-link" to={this.props.linkTo}>
          {this.props.textButton}
        </NavLink>
      </AwesomeButton>
    )
  }
}