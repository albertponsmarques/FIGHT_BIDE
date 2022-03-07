import React from 'react'
import { supabase } from './supabaseClient'
import Tournament from './Tournament'


export default function Tournaments() {
  
  return (
    <div className='home'>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-12">
            <h1>Tournaments</h1>
            <Tournament/>
          </div>
        </div>
      </div>
    </div>
  );
}