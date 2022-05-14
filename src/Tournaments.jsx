import React from 'react'
import Boton from './components/Boton';
import TournamentList from './TournamentList'
import './css/tournament.css'


export default function Tournaments() {
  
  return (
    <div className='home'>
      <div className="container_home">
        <div className="row my-5">
          <div className="col-8">
            <h1>Tournaments</h1>
            <TournamentList/>
          </div>
          <div className="col-3 button-create">
            <Boton linkTo={"/create"} textButton={"Create Tournament"} />
          </div>
        </div>
      </div>
    </div>
  );
}