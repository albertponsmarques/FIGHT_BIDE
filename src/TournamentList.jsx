import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'
import './css/tournament.css'

function TournamentList(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts(){
    const { data } = await supabase
      .from('torneig')
      .select('*')
      setPosts(data)
  }

  return(
    <ul>
    {
      posts.map(post => (
        <li key={post.id} className="link-tournament">
          - <Link className="link-tournament" to={`/tournament/${post.id}`}>{post.nom_torneig}</Link><br />
        </li>
      ))
    }
    </ul>
    
  )
}

export default TournamentList