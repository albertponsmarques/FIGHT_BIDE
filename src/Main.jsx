import './index.css'
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
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="./images/degref.jpg"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
            <Boton linkTo={"/accountnomod"} textButton={"Account"}/>
        </div>
      </div>
    </div>
  );
}

export default Main;