import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'
import './css/tournament.css'
import AsyncSelect from "react-select/async";

function ModalEquips(){
  const [posts, setPosts] = useState([])
  const us = supabase.auth.user()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function updateUserTeam(idTeam, email){
    const { data, error } = await supabase
      .from('profiles')
      .update({ team: idTeam })
      .match({ email: email })
    console.log(data)
  }

  async function fetchPosts(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      setPosts(data)
  }
  let valueTeam = null
  
  const handleInputChangeTeam = value => {
    valueTeam = value
    updateUserTeam(valueTeam, us.email)
  }

  const handleChangeTeam = value => {
    valueTeam = value
    updateUserTeam(valueTeam, us.email)
  }

  return(
    <div className="container-modal">
          <h2>Choose Your Team</h2>

          <div className="form_inputs">
            <AsyncSelect
              cacheOptions
              defaultOptions
              value = {posts}
              getOptionLabel={e => e.nom}
              getOptionValue={e => e.id}
              loadOptions={posts}
              onInputChange={handleInputChangeTeam}
              onChange={handleChangeTeam}
            />
          </div>

          <button type="button" onClick={this.props.handleClose}>
            Close
          </button>
        </div>
    
  )
}

export default ModalEquips