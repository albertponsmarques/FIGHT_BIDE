import {supabase} from './supabaseClient'
import './css/tournament.css'

function updateLeagueStart(tournament, teamList, reload){
  let bandera = false
  let firstTeamList = teamList
  let secondTeamList = teamList

  init()

  function init(){
    insertLeagueMatches()
    setTimeout(() => {
      updateLeagueStart()
    }, 1000);
  }

  

  async function insertLeagueMatches(){
    firstTeamList.map(team1 => (
      secondTeamList.map(team2 => {
        addTeamMatch(team1, team2)
      })
    ))
  }

  async function addTeamMatch(team1, team2){
    if (team1.id !== team2.id){
      console.log(team1)
      const {data, error} =  await supabase.from("league_matches").insert({ punts_local: 0, punts_visitant: 0, tournament: tournament.id, equip_local: team1.team, equip_visitant: team2.team})
      if (error) bandera = false
      console.log(error)
    }
  }

  async function updateLeagueStart(){
    const { data, error } = await supabase
      .from('torneig')
      .update({isStarted: true})
      .match({ id: tournament.id })
      console.log(error)

      if (error) bandera = false
      bandera = true

      reload()
  }


  return bandera
}

export default updateLeagueStart