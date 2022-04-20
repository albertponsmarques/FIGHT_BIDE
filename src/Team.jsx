import './css/tournament.css'
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'


const Team = () => {

  const [teams, setTeams] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    fetchTeams()
    fetchUser()
  }, [])

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
      setUser(data)
  }

  const sss = supabase.auth.user();
  console.log(sss);
  console.log(user)
  
  

  return(
    <div className="container-tournament row">
      <h1 className='col-19'>Teams</h1>
      <p className='col-19'>
        Current Team: 
        {
          user.map(u => (
            u.team
          ))
        }
        </p>
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