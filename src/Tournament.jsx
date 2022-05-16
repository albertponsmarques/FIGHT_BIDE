import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'
import {Bracket} from "react-tournament-bracket";
import './css/tournament.css'
import getMatch from './getMatchByID';
import getEquip from './getEquipByID';
import AddButton from './components/AddButton'
import MatchResults from './MatchResults';
import LeagueMatchResults from './LeagueMatchResults'
import { useNavigate } from "react-router-dom";
import GoButton from './components/GoButton';



const Tournament = () => {
  const [tournament, setTournament] = useState([])
  const [equips, setEquips] = useState([])
  const [matches, setMatches] = useState([])
  const [leagueTable, setLeagueTable] = useState([])
  const [matchAdd, setMatchAdd] = useState([])
  const [leagueTableAdd, setLeagueTableAdd] = useState([])
  const [numPersones, setNumPersones] = useState([])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate();

  let us = supabase.auth.user()

  const fetchTournaments = async () => {
    try{
      const { data } = await supabase
      .from('torneig')
      .select('*')
  
      //Filters
      .eq('id', id)
      .single()
  
      setTournament(data)
      setNumPersones(data)
    } catch (e){
      console.log(e)
    }
  }

  const fetchMatches = async () => {
    try{
      const { data } = await supabase
      .from('match')
      .select('*')
  
      //Filters
      .eq('torneig', id)
  
      setMatches(data)
    } catch (e){
      console.log(e)
    }
  }

  const fetchLeagueTable = async () => {
    try{
      const { data } = await supabase
      .from('league_table')
      .select('*')
  
      //Filters
      .eq('tournament', id)
  
      setLeagueTable(data)
    } catch (e){
      console.log(e)
    }
  }

  const fetchUsers = async () => {
    try{
      const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', supabase.auth.user().email)
      .single()

      setUsers(data)
    } catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchTournaments()
    fetchMatches()
    fetchFinal()
    fetchEquips()
    fetchMatchesAdd()
    fetchLeagueTable()
    fetchLeagueTeamAdd()
  },[loading])

  const fetchMatchesAdd = async () => {
    try{
      const { data } = await supabase
      .from('match')
      .select('*')
  
      //Filters
      .or('equip_local.is.null ,equip_visitant.is.null')
      .eq('torneig', id)

      setMatchAdd(data)
    } catch (e){
      console.log(e)
    }
  }

  const fetchLeagueTeamAdd = async () => {
    try{
      const { data } = await supabase
      .from('league_table')
      .select('*')
  
      //Filters
      .is('team', null)
      .eq('tournament', id)

      setLeagueTableAdd(data)
    } catch (e){
      console.log(e)
    }
  }


  const [final, setFinal] = useState([])

  const fetchFinal = async () => {
    try{
      const { data } = await supabase
      .from('match')
      .select('*')
  
      //Filters
      .eq('torneig', id)
      .eq('name', "final")
      .limit(1)
  
      setFinal(data)
    } catch (e){
      console.log(e)
    }
  }
  
  const fetchEquips = async () => {
    try{
      const { data } = await supabase
      .from('equip')
      .select('*')
  
      setEquips(data)
    } catch (e){
      console.log(e)
    }
  }



  function getLastMatch(){
    let finalGame = null

    final.map(game => (
      finalGame = game
    ))


    if (finalGame == null){
      const game2 = {
        id: "finalGame.id",
        name: "finalGame.name",
        scheduled: "last.scheduled",
        sides: {
          home: {
            team: {
              id: "12",
              name: "Team 1"
            },
            score: {
              score: 15
            }
          },
          visitor: {
            team: {
              id: "11",
              name: "Team 2"
            },
            score: {
              score: 4
            }
          }
        }
      };

      const game3 = {
        id: "finalGame.id",
        name: "finalGame.name",
        scheduled: "last.scheduled",
        sides: {
          home: {
            team: {
              id: "12",
              name: "Team 1"
            },
            score: {
              score: 15
            }
          },
          visitor: {
            team: {
              id: "11",
              name: "Team 2"
            },
            score: {
              score: 4
            }
          }
        }
      };

      const game = {
        id: "finalGame.id",
        name: "finalGame.name",
        scheduled: "last.scheduled",
        sides: {
          home: {
            team: {
              id: "12",
              name: "Team 1"
            },
            score: {
              score: 15
            },
            seed: {
              displayName: "A1",
              rank: 1,
              sourceGame: game2,
              sourcePool: {}
            }
          },
          visitor: {
            team: {
              id: "11",
              name: "Team 2"
            },
            score: {
              score: 4
            },
            seed: {
              displayName: "A2",
              rank: 1,
              sourceGame: game3,
              sourcePool: {}
            }
          }
        }
      };
      return game
    } 
    else{
      let bandera = true

      let tournamentGames = []
      let teamList = []

      matches.map(match => (
        tournamentGames.push(match)
      ))

      equips.map(team => (
        teamList.push(team)
      ))
    

      const game = {
        id: finalGame.id,
        name: finalGame.name,
        scheduled: finalGame.scheduled,
        sides: {
          home: {
            team: {
              id: finalGame.equip_local,
              name: getEquip(finalGame.equip_local, teamList)
            },
            score: {
              score: finalGame.punts_local
            },
            seed: {
              displayName: "A1",
              rank: 1,
              sourceGame: getMatch(finalGame.last_gameLocal, tournamentGames, teamList),
              sourcePool: {}
            }
          },
          visitor: {
            team: {
              id: finalGame.equip_visitant,
              name: getEquip(finalGame.equip_visitant, teamList)
            },
            score: {
              score: finalGame.punts_visitant
            },
            seed: {
              displayName: "A2",
              rank: 1,
              sourceGame: getMatch(finalGame.last_gameVisitant, tournamentGames, teamList),
              sourcePool: {}
            }
          }
        }
      };

      while(bandera){
        bandera = false
      }
      

      return game
    }
  }

  function getList(tourn){
    return (
      <p key={tourn.id}>{tourn.nom_torneig}</p>
    )
  }


  let own = false
  function isPropietary(){
    if(us === null){
      navigate("/login");
    } else{
      if (tournament.profile === us.id){
        own = true
      }
    }
  }
  
  return(
    tournament.tipus_torneig === 1 ?
      <div className="container-tournament" key={id}>
          <div className='row'>
            <div className='col-5'>
              <h1>
                {getList(tournament)}
              </h1>
              <div className="col-12 torneig">
                <Bracket game={getLastMatch()} />
              </div>
            </div>
            <div className='col-1'>
              <AddButton
                type="secondary"
                size="large"
                linkTo={"/tournament/" + id}
                textButton="add team"
                list={matchAdd}
                tournamentType={tournament.tipus_torneig}
                users={users}
                numPlayers={numPersones}
              />
              {
                isPropietary()
              }
              {own ?
                <MatchResults tournamentID={id}/>
                : "" }
            </div>
          </div>
      </div>
    :
      <div className="container-tournament" key={id}>
        <div className='row'>
          <div className='col-5'>
            <h1>
              {getList(tournament)}
            </h1>
            <div className="col-12 torneig ">
              <table>
                <tbody>
                  <tr>
                    <td className='titol-tabla'>Team</td>
                    <td className='titol-tabla'>Matches played</td>
                    <td className='titol-tabla'>Scores</td>
                    <td className='titol-tabla'>Points</td>
                  </tr>
                  {
                    leagueTable.map(team => (
                      <tr key={team.id}>
                        {
                          team.team === null ?
                            <td>NO TEAM YET</td>
                          :
                          <td>{team.team}</td>
                        }
                        <td>{team.matches_played}</td>
                        <td>{team.scores}</td>
                        <td>{team.points}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-1'>
            <AddButton
              type="secondary"
              size="large"
              linkTo={"/tournament/" + id}
              textButton="add team"
              list={leagueTableAdd}
              users={users}
              tournamentType={tournament.tipus_torneig}
            />
            {
              isPropietary()
            }
            {
              own ? 
                tournament.isStarted ?
                  <LeagueMatchResults tournamentID={id}/>
                :
                  <GoButton
                    type="secondary"
                    size="large"
                    linkTo={"/tournament/" + id}
                    list={leagueTable}
                    tournament={tournament}
                    textButton={"Start League"}
                  />
              :
                ""
            }
          </div>
        </div>
      </div>
  )
}


export default Tournament