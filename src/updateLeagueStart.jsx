import {supabase} from './supabaseClient'
import './css/tournament.css'

function updateLeagueStart(tournamentID){
  let bandera = false


  init()

  function init(){

    updateLeagueStart()
  }

  async function insertLeagueMatches(){
    
  }

  async function updateLeagueStart(){
    const { data, error } = await supabase
      .from('torneig')
      .update({isStarted: true})
      .match({ id: tournamentID })
      console.log(data)

      bandera = true
  }


  return bandera
}

export default updateLeagueStart