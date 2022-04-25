export default function getEquip(idTeam, teamList){

  

  let thisTeam = null


  getTeamInList()

  function getTeamInList(){
    teamList.forEach(team => {
      if (team.id == idTeam){
        thisTeam = team.nom
      }
      if (thisTeam == null){
        thisTeam = "NO TEAM YET"
      }
    });;
  }

  return thisTeam

}