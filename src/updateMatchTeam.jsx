import {supabase} from './supabaseClient'
import './css/tournament.css'

function updateMatchTeam(matchList, user, num_persones){
  let bandera = true
  let side = true

  let id = 0

  init()

  console.log(matchList, user, num_persones)

  function getNameRound(num_persones){
    console.log(num_persones)
    if(num_persones>2 && num_persones<=4){
      return "semifinal"
    } else if(num_persones>4 && num_persones<=8){
      return "cuartos"
    } else if(num_persones>8 && num_persones<=16){
      return "octavos"
    } else if(num_persones>16 && num_persones<=32){
      return "dieciseisavos"
    } else{
      return "Ronda de 64"
    }
  }


  function init(){
    getOneMatch(matchList)
    setTimeout(() => {
      if(!side){
        updateLocalTeam(id, user.team)
      } else{
        updateVisitantTeam(id, user.team)
      }  
    }, 200);
    
  }

  function getOneMatch(matchList){
    let done = false

    matchList.map(match =>{
      if(match.equip_local === user.team || match.equip_visitant === user.team){
        done = true
        bandera = false
      }
    })

    matchList.map(match => {
      if(!done){
        if(match.equip_local === null && match.name === getNameRound(num_persones)){
          console.log(match)
          side = false
          bandera=true
          done = true
          id = match.id 
        } else if(match.equip_visitant === null && match.name === getNameRound(num_persones)){
          console.log(match)
          side = true
          bandera=true
          done = true
          id = match.id
        } else{
          bandera = false
        }
      }
    })
  }

  async function updateLocalTeam(matchID, teamID){
    const { data, error } = await supabase
      .from('match')
      .update({equip_local: teamID})
      .match({ id: matchID })

      console.log(data)

      end()
  }

  async function updateVisitantTeam(matchID, teamID){
    const { data, error } = await supabase
      .from('match')
      .update({equip_visitant: teamID})
      .match({ id: matchID })
      console.log(data)

      end()
  }

  function end(){
    setTimeout(() => {
      bandera ? window.location.reload(false) : alert("You already added your TEAM or Bracket is already FULL!")
    }, 300)
  }


  return bandera
}

export default updateMatchTeam