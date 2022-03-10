import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react/cjs/react.development'
import {supabase} from './supabaseClient'

function TournamentList(){
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({id: "", nom_torneig: "", esport: "", tipus_torneig: ""})
  const {id, nom_torneig, esport, tipus_torneig} = post

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
          <li key={post.id}>
            <Link to={`/tournament/${post.id}`}>{post.nom_torneig}</Link><br />
          </li>
        ))
      }
    </ul>
    
  )
}

export default TournamentList