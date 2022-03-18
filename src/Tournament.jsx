import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'
import Game from './components/Game'
import './css/tournament.css'

const Tournament = () => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({id: "", nom_torneig: "", esport: "", tipus_torneig: ""})
  const {id} = useParams()

  useEffect(() => {
    fetchPosts()
    fetchMatches()
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
  

  async function fetchMatches(){
    const { data } = await supabase
      .from('match')
      .select('*')

      //Filters
      .eq('torneig', id)

      setMatches(data)
  }

  

  return(
    <div>
      {
        posts.map(post => (
          <div className="container-tournament" key={post.id}>
            <h1>
              {post.nom_torneig}
            </h1>
            <Game gamesList={matches}/>
          </div>
        ))
      }
    </div>
  )
}

export default Tournament