import React from 'react'
import { matchRoutes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'
import {
  Bracket,
  BracketGame,
} from "react-tournament-bracket";
import './css/tournament.css'
import getMatch from './getMatchByID';


const Tournament = () => {
  const [tournament, setTournament] = useState([])
  const [matches, setMatch] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useParams()


  const fetchTournaments = async () => {
    try{
      const { data } = await supabase
      .from('torneig')
      .select('*')
  
      //Filters
      .eq('id', id)
  
      setTournament(data)
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
  
      setMatch(data)
    } catch (e){
      console.log(e)
    }
  }
  useEffect(() => {
    fetchTournaments()
    fetchMatches()
    fetchFinal()
  },[loading])


  const [final, setFinal] = useState([])

  const fetchFinal = async () => {
    try{
      const { data } = await supabase
      .from('match')
      .select('*')
  
      //Filters
      .eq('torneig', id)
      .eq('name', "final")
  
      setFinal(data)
    } catch (e){
      console.log(e)
    }
  }
  

  const game2 = {
    id: "2",
    name: "aaaa",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "12",
          name: "aaaaa1"
        },
        score: {
          score: 1
        }
      },
      visitor: {
        team: {
          id: "13",
          name: "Team 4"
        },
        score: {
          score: 0
        }
      }
    }
  };


  const game3 = {
    id: "3",
    name: "mi-finals",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "11",
          name: "Team 2"
        },
        score: {
          score: 1
        }
      },
      visitor: {
        team: {
          id: "12",
          name: "Team 3"
        },
        score: {
          score: 0
        }
      }
    }
  };
  
  const game1 = {
    id: "1",
    name: "aaa.name",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "10",
          name: "Team 1"
        },
        score: {
          score: 3
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


  function getLastMatch(){
    let finalGame = null

    final.map(game => (
      finalGame = game
    ))

    if (finalGame == null){
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

      matches.map(match => (
        tournamentGames.push(match)
      ))

      const game = {
        id: finalGame.id,
        name: finalGame.name,
        scheduled: finalGame.scheduled,
        sides: {
          home: {
            team: {
              id: finalGame.equip_local,
              name: "Team 1"
            },
            score: {
              score: finalGame.punts_local
            },
            seed: {
              displayName: "A1",
              rank: 1,
              sourceGame: getMatch(finalGame.last_gameLocal, tournamentGames),
              sourcePool: {}
            }
          },
          visitor: {
            team: {
              id: finalGame.equip_visitant,
              name: "Team 2"
            },
            score: {
              score: finalGame.punts_visitant
            },
            seed: {
              displayName: "A2",
              rank: 1,
              sourceGame: getMatch(finalGame.last_gameVisitant, tournamentGames),
              sourcePool: {}
            }
          }
        }
      };

      console.log(tournamentGames)

      while(bandera){
        bandera = false
      }
      

      return game
    }
  }

  function getList(list){
    return (
      list.map(tourn => (
        <p key={tourn.id}>{tourn.nom_torneig}</p>      
      ))
    )
  }
  

  return(
    <div className="container-tournament" key={id}>
      <div className='Hola'>
          <h1>
            {getList(tournament)}
          </h1>
          <>
          <div className="col-lg-5">
            <Bracket game={getLastMatch()} />
          </div>
          </>
        </div>

    </div>
  )
}


export default Tournament