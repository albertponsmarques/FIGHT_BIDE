import React from 'react'
import { supabase } from './supabaseClient'


export default function Tournament() {

  async function getData(){
    let { data: torneig, error } = await supabase
      .from('torneig')
      .select('*')

    return torneig
  }
  

  let torneo = getData();

  return (
    <ul>
      {torneo.map((torneo,index)=>{
          return <li key={index}>{torneo}</li>
      })}
    </ul>
  );
}