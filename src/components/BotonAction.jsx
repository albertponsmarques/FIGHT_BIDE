import '../css/index.css'
import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import { AwesomeButton } from "react-awesome-button";
import "../css/awesomeButtons.css";  




export default class BotonAction extends Component{
  render(){
    return (
      <AwesomeButton className={this.props.className} type={this.props.type} size={this.props.size} onPress={this.props.action} >
        {this.props.textButton}
      </AwesomeButton>
    )
  }
}