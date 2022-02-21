import React from "react";
import "./css/navbar.css"
import { NavLink } from "react-router-dom";
import logo_img from "./images/LOGO_fightbide.png";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-black">
        <div className="container">
          <NavLink className="container_logo" to="/home">
            <figure> <img class="logo" src={logo_img} alt="Logo FIGHT BIDE"/> </figure>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Profile
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;