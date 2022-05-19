import "../css/navbar.css";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import logo_img from "../images/LOGO_fightbide.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import React from 'react';

const NavigationSmall = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="containerHamburger">
      <GiHamburgerMenu
        className="hamburgerIcon"
        size="35px"
        color="black"
        onClick={() => setOpen(!open)}
      />
      <NavLink className="container_logo" to="/">
        <img className="logo" src={logo_img} alt="Logo FIGHT BIDE" />
      </NavLink>
      {open && (
        <div className="linksMobile">
          <NavLinks />
        </div>
      )}
    </div>
  );
};

export default NavigationSmall;
