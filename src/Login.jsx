import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { NavLink } from "react-router-dom";
import "./css/Login.css"
import Boton from "./Boton"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email , password})
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <h1 className="header">Login</h1>
        <div className='form_inputs'>
          <input
            className="inputField"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form_inputs'>
          <input
            className="inputField"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <Boton linkTo={"/accountnomod"} textButton={"Account"} size="medium" type="instagram"/>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email, password)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Login!</span>}
          </button>
        </div>
        <div>
            <h3>You don't have an account? no worries click the button below to register</h3>
            <button><NavLink className="nav-link" to="/register">
                  Register
                </NavLink></button>
        </div>
      </div>
    </div>
  )
}