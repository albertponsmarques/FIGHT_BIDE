import React from 'react'
import { matchRoutes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'
import {
  Bracket,
  BracketGame,
} from "react-tournament-bracket";
import './css/tournament.css'
import * as ReactBootStrap from 'react-bootstrap'
import { HalfMalf } from 'react-spinner-animated';
import Game from './model/Game';


const Tournament = () => {
  const [tournament, setTournament] = useState([])
  const [match, setMatch] = useState([])
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
  },[loading])

  

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
    const last = match.pop()

    console.log(JSON.stringify(last))
    
    const finalGame = {
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


    return finalGame
  }




  function refreshPage() {
    setLoading(true)
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
      {loading ?
        <div className='Hola'>
          <h1>
            {getList(tournament)}
          </h1>
          <>
          <div className="col-lg-5">
            <Bracket game={getLastMatch()} />
          </div>
          <div className="col-lg-5 final">
            <BracketGame game={getLastMatch()} />
          </div>
          </>
        </div>

          :
        
        <div>
          {
            setTimeout(refreshPage(), 2000)
          }
          <HalfMalf />
        </div>
      }

    </div>
  )
}


export default Tournament