import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./css/Login.css";
import Boton from "./Boton";
import BotonAction from "./BotonAction";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerLogin">
      <h1 className="header">Login</h1>
      <div className="form_inputs">
        <input
          className="inputField"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin(email, password);
            }
          }}
        />
      </div>
      <div className="form_inputs">
        <input
          className="inputField"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin(email, password);
            }
          }}
        />
      </div>
      <div className="boto_login">
        <BotonAction
          type="primary"
          size="medium"
          action={(e) => {
            handleLogin(email, password);
          }}
          textButton={loading ? <span>loading...</span> : <span>Login!</span>}
        />
      </div>
      <div>
        <h4 className="register_text">
          You don't have an account? no worries click the button below to
          register
        </h4>
        <div className="boto_register">
          <Boton
            linkTo={"/register"}
            textButton={"Register"}
            size="medium"
            type="secondary"
          />
        </div>
      </div>
    </div>
  );
}
