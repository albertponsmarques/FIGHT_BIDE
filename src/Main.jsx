import './css/index.css'
import React from 'react'
import { supabase } from './supabaseClient'
import Boton from './Boton'

function Main() {
  const session = supabase.auth.session()
  console.log(session)
  return (
    <div className='home'>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <Boton linkTo={"/"} textButton={"Crear Torneo"} size="home" type="anchor"/>
          </div>
          <div className="col-lg-5">
            <Boton linkTo={"/accountnomod"} textButton={"Account"} size="home" type="anchor"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;