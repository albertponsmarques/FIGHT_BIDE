import "../css/navbar.css"
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GiRayGun } from "react-icons/gi";
import { RiTestTubeLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import React from 'react';

const NavLinks = () => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/home">
          <AiFillHome/>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/tournaments">
          <GiRayGun/>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/test">
          <RiTestTubeLine/>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/accountnomod">
          <CgProfile/>
          <span className="sr-only">(current)</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
