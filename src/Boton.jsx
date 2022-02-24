import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Boton(linkTo) {
    return (
        <button><NavLink className="nav-link" to="/accountnomod">
        Prueba
      </NavLink></button>
    )
  }