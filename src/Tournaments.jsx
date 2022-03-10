import React from 'react'
import TournamentList from './TournamentList'


export default function Tournaments() {
  
  return (
    <div className='home'>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-12">
            <h1>Tournaments</h1>
            <TournamentList/>
          </div>
        </div>
      </div>
    </div>
  );
}