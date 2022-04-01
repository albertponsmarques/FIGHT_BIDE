import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import BotonAction from "./components/BotonAction";
import { supabase } from "./supabaseClient";


function CreateTournament() {
  const [loading, setLoading] = useState(false);
  const [nom_torneig, setNomTorneig] = useState("");
  const [num_persones, setNumPersones] = useState("");
  const [inputValueEsport, setValueEsport] = useState('');
  const [esportValue, setEsportValue] = useState(null);
  const [inputValueTipus, setValueTipus] = useState('');
  const [tipusValue, setTipusValue] = useState(null);

  

  async function fetchEsport(){
    const { data } = await supabase
      .from('esport')
      .select('*')

      return data
  }

  async function fetchTipusTorneig(){
    const { data } = await supabase
      .from('tipus_Torneig')
      .select('*')

      return data
  }


  const handleInsert = async (nom_torneig, esport, tipus_torneig, num_persones) => {
    console.log(tipusValue.id)
    console.log(esportValue.id)
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const { error } =  await supabase.from("torneig").insert({ nom_torneig: nom_torneig, esport: esport.id, tipus_torneig: tipus_torneig.id, profile: user.id, num_persones: num_persones });
      if (error) throw error;
      alert("Have to program the redirection!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChangeEsport = value => {
    setValueEsport(value)
  }

  const handleChangeEsport = value => {
    setEsportValue(value)
  }

  const handleInputChangeTipus = value => {
    setValueTipus(value)
  }

  const handleChangeTipus = value => {
    setTipusValue(value)
  }

  
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
                handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
              }
            }}
          />
        </div>
        <div className="form_inputs">
          <input
            className="inputField"
            type="number"
            placeholder="Participants"
            value={nom_torneig}
            onChange={(e) => setNumPersones(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
              }
            }}
          />
        </div>
        <div className="form_inputs">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value = {esportValue}
            getOptionLabel={e => e.nom_esport}
            getOptionValue={e => e.id}
            loadOptions={fetchEsport}
            onInputChange={handleInputChangeEsport}
            onChange={handleChangeEsport}
          />
        </div>
        <div className="form_inputs">
          <AsyncSelect
              cacheOptions
              defaultOptions
              value = {tipusValue}
              getOptionLabel={e => e.tipus_torneig}
              getOptionValue={e => e.id}
              loadOptions={fetchTipusTorneig}
              onInputChange={handleInputChangeTipus}
              onChange={handleChangeTipus}
            />
        </div>
        <div className="register_button">
          <BotonAction
            type="secondary"
            size="medium"
            action={(e) => {
              handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
            }}
            textButton={loading ? <span>Loading</span> : <span>Create!</span>}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTournament