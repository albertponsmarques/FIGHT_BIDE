import './css/tournament.css'
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'
import ChooseTeam from './ChooseTeam';


const Team = () => {
  const [teams, setTeams] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    fetchTeams()
    fetchUser()
  }, [])

  const us = supabase.auth.user()

  async function fetchTeams(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      setTeams(data)
  }

  async function fetchUser(){
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', us.email)
      .single()

      setUser(data)
  }

  return(
    <div className="container-tournament row">
      <h1 className='col-19'>Teams</h1>
      <ChooseTeam teams={teams} user={user}/>
      <ul className='col-12'>
      {
        teams.map(team => (
          <p key={team.id}>
            {team.nom}
          </p>
        ))
      }
    </ul>
    </div>
  )
}


export default Team