import "../css/navbar.css"
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/home">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/tournaments">
          Tournaments
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/test">
          Test
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/accountnomod">
          Profile
          <span className="sr-only">(current)</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
