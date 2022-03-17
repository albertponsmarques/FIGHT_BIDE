import React from "react";
import "./css/Navigation.css"
import NavigationBig from "./components/NavigationBig";
import NavigationSmall from "./components/NavigationSmall";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-black">
        <NavigationBig/>
        
      </nav>
    </div>
  );
}

export default Navigation;