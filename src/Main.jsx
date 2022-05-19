import "./css/home.css";
import React from "react";
import { supabase } from "./supabaseClient";
import Boton from "./components/Boton";
import ImageBracket from "./images/tournament.png";

function Main() {
  const session = supabase.auth.session();
  console.log(session);
  return (
    <div className="home">
      <div className="container_home">
        <div className="data_home">
          <h1 className="homeTitle">Welcome to Fight-Bide!</h1>
          <div className="home_text">
            <p className="home_text_p">
              Fight-bide is a wonderful app created by two guys, that had to do
              a class project.
              <br />
              Our app is designed to give the ability to people that likes
              playing games or maybe other tinghs, we don't care as far as you
              are enjoying it!
              <br />
              With fight-bide you can create and personalize your profile, and
              create create tournaments, with teams and players.
              <br />
              You can create different kind of tournaments, and upload images
              and photos of them. So don't be shy and share that valorant ace
              clip you got at the las game!
            </p>
          </div>
          <img className="imageBracket" src={ImageBracket} />
          <div className="home_text">
            <p className="home_text_p_button">
              Do yoy want to create a tournament? <br />
              Make it by yourself here!
            </p>
          </div>
          <div className="botonGo">
            <Boton
              type="primary"
              size="small"
              linkTo="/tournaments"
              textButton="GO!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
