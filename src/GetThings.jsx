import React from 'react'
import { matchRoutes, useParams } from 'react-router-dom'
import { Component, useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'
import {
  Bracket,
  BracketGame,
} from "react-tournament-bracket";
import './css/tournament.css'

export default class GetThings extends Component{
  
  state = {
    loading: true
  }

  componentDidMount(){

  }
  
  render(){
    return (
      <div>
        {this.state.loading ? <div>loading...</div> : <div>person...</div>}
      </div>
    )
  }
}

  

