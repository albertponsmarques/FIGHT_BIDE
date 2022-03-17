import "../css/navbar.css";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import logo_img from "../images/LOGO_fightbide.png";

const NavigationBig = () => {
  return (
    <div className="container">
      <NavLink className="container_logo" to="/">
        <figure>
          {" "}
          <img className="logo" src={logo_img} alt="Logo FIGHT BIDE" />{" "}
        </figure>
      </NavLink>
      <div>
        <NavLinks />
      </div>
    </div>
  );
};

export default NavigationBig;
