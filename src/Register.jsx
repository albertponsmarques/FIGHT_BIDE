import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import BotonAction from "./components/BotonAction";
import "./css/register.css";
import GoogleButton from "react-google-button";

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

  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  }

  return (
    <div className="row flex flex-center">
      <div className="mt-5 col-6 form-widget">
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
        <div className="w-50 mx-auto mt-4">
          <p>You can register with google as well!</p>
          <GoogleButton
            onClick={() => {
              signInWithGoogle();
            }}
          />
        </div>
      </div>
    </div>
  );
}
