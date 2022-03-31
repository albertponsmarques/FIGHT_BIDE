import React, { useState } from "react";
import BotonAction from "./components/BotonAction";
import { supabase } from "./supabaseClient";


function CreateTournament() {

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

  const { data, error } = await supabase
  .from('torneig')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  
  return (
    <div className="row flex flex-center">
      <div className="mt-5 col-6 form-widget">
        <h1 className="header">Create Tournament</h1>
        <p className="description">
          Fill In the fields to create tournament
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
      </div>
    </div>
  );
}

export default CreateTournament