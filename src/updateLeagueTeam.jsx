import {supabase} from './supabaseClient'
import './css/tournament.css'

function updateLeagueTeam(user, listTeams){
  let bandera = true
  let id = 0

  init()
  
  function init(){
    getOneMatch(listTeams)
    updateLeagueTeam(id)
  }

  function getOneMatch(matchList){
    let done = false

    matchList.map(match =>{
      if(match.team === user.team){
        done = true
        bandera = false
      }
    })

    matchList.map(match => {
      if(!done){
        if(match.team === null){
          console.log(match)
          done = true
          id = match.id
        } else{
          bandera = false
        }
      }
    })
  }

  async function updateLeagueTeam(id){
    const { data, error } = await supabase
      .from('league_table')
      .update({team: user.team})
      .match({ id: id })
      console.log(data)

      if (error) bandera = false

      end()
  }

  function end(){
    setTimeout(() => {
      bandera ? window.location.reload(false) : alert("You already added your TEAM or League is already FULL!")
    }, 500)
  }


  return bandera
}

export default updateLeagueTeam