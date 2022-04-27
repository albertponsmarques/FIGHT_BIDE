import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {supabase} from './supabaseClient'
import './css/tournament.css'
import AsyncSelect from "react-select/async";

function updateMatchTeam(matchList){
  let bandera = false

  init()


  function init(){
    matchList.map(match => {
      if(match.name == "cuartos"){
        if(match.equip_local == null){
          updateAddTeam(match.id, {equip_local: })
        } else if(match.equip_visitant == null){

        }
      } else{
        bandera = false
      }
    })
  }

  async function updateAddTeam(matchID, update){
    const { data, error } = await supabase
      .from('match')
      .update(update)
      .match({ id: matchID })
    console.log(data)
  }

  return bandera
}

export default updateMatchTeam