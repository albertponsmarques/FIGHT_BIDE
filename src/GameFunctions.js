import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {supabase} from './supabaseClient'


export default function GameFunctions(){
    const [matches, setMatches] = useState([])
    const [match, setMatch] = useState({id: "", name: "", last_gameLocal: "", last_gameVisitant: "", scheduled: "", equip_local: "", equip_visitant: "", punts_local: "", punts_visitant: "", torneig: ""})
    const {id} = useParams()
  
    console.log(id)

    useEffect(() => {
        fetchMatches()
      }, [])

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
            matches.map(match => (
                <div className="container-tournament" key={match.id}>
                  <h1>
                      {console.log(match.last_gameVisitant)}
                    {match.last_gameVisitant}
                  </h1>
                </div>
              ))
          }
        </div>
      )
}
