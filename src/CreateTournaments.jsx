import React, { useState, useEffect } from "react";
import BotonAction from "./components/BotonAction";
import { supabase } from "./supabaseClient";


function CreateTournament() {

  const [loading, setLoading] = useState(false);
  const [nom_torneig, setNomTorneig] = useState("");
  const [esport, setEsport] = useState([]);
  const [tipus_torneig, setTipusTorneig] = useState([]);

  useEffect(() => {
    fetchEsport()
    fetchTipusTorneig()
  }, [loading])

  async function fetchEsport(){
    const { data } = await supabase
      .from('esport')
      .select('*')

      setEsport(data)
      console.log(data)
      console.log(esport)
  }

  async function fetchTipusTorneig(){
    const { data } = await supabase
      .from('tipus_Torneig')
      .select('*')

      setEsport(data)
      console.log(data)
      console.log(tipus_torneig)

  }
  
  

  const handleInsert = async (nom_torneig, esport, tipus_torneig) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const { error } =  await supabase.from("torneig").insert({ nom_torneig: nom_torneig, esport: esport, tipus_torneig: tipus_torneig, profile: user.id });
      if (error) throw error;
      alert("Have to program the redirection!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  
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
            type="text"
            placeholder="Tournament Name"
            value={nom_torneig}
            onChange={(e) => setNomTorneig(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInsert(nom_torneig, esport, tipus_torneig);
              }
            }}
          />
        </div>
        <div>
          <select>
            {
              tipus_torneig.map(tipus => (
                <option key={tipus.id}>{tipus.tipus_torneig}</option>
              ))
            }
          </select>
        </div>
        <div className="form_inputs">
          <input
            className="inputField"
            type="text"
            placeholder="Esport"
            value={esport}
            onChange={(e) => setEsport(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInsert(nom_torneig, esport, tipus_torneig);
              }
            }}
          />
        </div>
        <div className="form_inputs">
          <input
            className="inputField"
            type="text"
            placeholder="Tipus Torneig"
            value={tipus_torneig}
            onChange={(e) => setTipusTorneig(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInsert(nom_torneig, esport, tipus_torneig);
              }
            }}
          />
        </div>
        <div className="register_button">
          <BotonAction
            type="secondary"
            size="medium"
            action={(e) => {
              handleInsert(nom_torneig, esport, tipus_torneig);
            }}
            textButton={loading ? <span>Loading</span> : <span>Create!</span>}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTournament