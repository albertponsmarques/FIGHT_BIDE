import React from 'react'
import { matchRoutes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'
import {
  Bracket,
  BracketGame,
} from "react-tournament-bracket";
import './css/tournament.css'

const Tournament = () => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({id: "", nom_torneig: "", esport: "", tipus_torneig: ""})
  const {id} = useParams()

  useEffect(() => {
    setTimeout(fetchPosts, 100)
    setTimeout(fetchMatches, 500)
  }, [])

  async function fetchPosts(){
    const { data } = await supabase
      .from('torneig')
      .select('*')

      //Filters
      .eq('id', id)

      setPosts(data)
  }

  const [matches, setMatches] = useState([])
  const [match, setMatch] = useState({id: "", name: "", scheduled: "", equip_local: "", equip_visitant: "", punts_local: "", punts_visitant: "", torneig: ""})
  
  

  const gamesList = []

  async function fetchMatches(){
    const { data } = await supabase
      .from('match')
      .select('*')

      //Filters
      .eq('torneig', id)

      setMatches(data)
  }

  class Game {
    constructor(id, name, last_gameLocal, last_gameVisitant, scheduled, equip_local, equip_visitant, punts_local, punts_visitant, torneig) {
      this.id = id;
      this.name = name;
      this.last_gameLocal = last_gameLocal;
      this.last_gameVisitant = last_gameVisitant;
      this.scheduled = scheduled;
      this.equip_local = equip_local;
      this.equip_visitant = equip_visitant;
      this.punts_local = punts_local;
      this.punts_visitant = punts_visitant;
      this.torneig = torneig;
    }
  }

  matches.map(match => (
    gamesList.push(new Game(match.id, match.name, match.last_gameLocal, match.last_gameVisitant, match.scheduled, match.equip_local, match.equip_visitant,
      match.punts_local, match.punts_visitant, match.torneig))
  ))

  console.log(gamesList)


  

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

  const aaa = gamesList.pop()
  console.log(aaa)
  
  function games(){
    
  }
  
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
          score: 2
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
          score: 3
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

  return(
    <div>
      {
        posts.map(post => (
          <div className="container-tournament" key={post.id}>
            <h1>
              {post.nom_torneig}
            </h1>
            <>
              <div className="col-lg-5">
                <Bracket game={game1} />
              </div>
              <div className="col-lg-5 final">
                <BracketGame game={game1} />
              </div>
            </>
          </div>
        ))
      }
    </div>
  )
}

export default Tournament