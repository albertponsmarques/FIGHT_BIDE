import './index.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Component } from 'react/cjs/react.production.min'




export default class Boton extends Component{
  render(){
    return (
      <button className='buttonPrimary'><NavLink className="buttonPrimary" to={this.props.linkTo}>
        {this.props.textButton}
      </NavLink></button>
    )
  }
}