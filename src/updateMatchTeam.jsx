import {supabase} from './supabaseClient'
import './css/tournament.css'

function updateMatchTeam(matchList, user, num_persones){
  let bandera = false
  let side = false

  let id = 0
  let name

  console.log(user)
  console.log(matchList)
  console.log(num_persones)

  init()

  function getNameRound(num_persones){
    if(num_persones>2 && num_persones<=4){
      name = "semifinals"
    } else if(num_persones>4 && num_persones<=8){
      name = "cuartos"
    } else if(num_persones>8 && num_persones<=16){
      name = "octavos"
    } else if(num_persones>16 && num_persones<=32){
      name = "dieciseisavos"
    } else{
      name = "Ronda de 64"
    }
  }


  function init(){
    getNameRound(num_persones)
    getOneMatch(matchList)
    if(side){
      updateLocalTeam(id, user.team)
    } else{
      updateVisitantTeam(id, user.team)
    }
  }

  function getOneMatch(matchList){
    let done = false

    matchList.map(match => {
      if(!done){
        if(match.equip_local == null){
          side = true
          done = true
          id = match.id
        } else if(match.equip_visitant == null){
          side = false
          done = true        
          id = match.id
        }
      }
    })
  }

  async function updateLocalTeam(matchID, teamID){
    console.log("local")
    const { data, error } = await supabase
      .from('match')
      .update({equip_local: teamID})
      .match({ id: matchID })

      console.log(data)


  }

  async function updateVisitantTeam(matchID, teamID){
    console.log("visi")
    const { data, error } = await supabase
      .from('match')
      .update({equip_visitant: teamID})
      .match({ id: matchID })
      console.log(data)
  }


  return bandera
}

export default updateMatchTeam