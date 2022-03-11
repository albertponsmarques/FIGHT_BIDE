import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import BotonAction from "./BotonAction";
import "./css/register.css";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Register</h1>
        <p className="description">
          Register with your email and password below, we will send you a
          confirmation email.
        </p>
        <div className="form_inputs">
          <input
            className="inputField"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_inputs">
          <input
            className="inputField"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register_button">
          <BotonAction
            type="secondary"
            size="medium"
            action={(e) => {
              handleLogin(email, password);
            }}
            textButton={loading ? <span>Loading</span> : <span>Register!</span>}
          />
        </div>
      </div>
    </div>
  );
}
