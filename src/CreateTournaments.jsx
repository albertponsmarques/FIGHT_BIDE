import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import BotonAction from "./components/BotonAction";
import { supabase } from "./supabaseClient";


function CreateTournament() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nom_torneig, setNomTorneig] = useState("");
  const [num_persones, setNumPersones] = useState("");
  const [inputValueEsport, setValueEsport] = useState('');
  const [esportValue, setEsportValue] = useState(null);
  const [inputValueTipus, setValueTipus] = useState('');
  const [tipusValue, setTipusValue] = useState(null);
  const [ultimaID, setLastID] = useState(null);
  const [lastTournament, setLastTournament] = useState(null);


  async function fetchLastId(){
    const { data } = await supabase
      .from('match')
      .select('id')
      .order("id", { ascending: false })
      .limit(1)

      setLastID(data)

      let id = 0

      data.map(last =>(
        setTimeout(
          id = last.id
          , 1000)
      ))

      return id
  }

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

  async function fetchLastTournament(){
    const { data } = await supabase
      .from('torneig')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)

      setLastTournament(data)

      console.log(lastTournament)
  }

  const user = supabase.auth.user();

  useEffect(() => {
    // call the async fetchData function
    fetchLastTournament()
  }, [])

  function handleRedirection() {
    lastTournament.map(last =>(
      setTimeout(
        insertMatches(last.id),
        window.location.replace('/tournament/' + last.id)
        , 1000)
    ))
  }

  async function insertMatches(id){
    try {
      setRefreshing(true);
      getMatch(num_persones, id)
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchLastId()
  }, [])

  function getMatch(num, id){
    if(ultimaID != null){
      let lastID = ultimaID[0].id
      console.log(lastID)
      lastID++
      console.log(lastID)
      let lastIDOctavos = []
      let lastIDCuartos = []
      let lastIDSemifinales = []
    
  
      if(num <= 64 && num > 32){
        
      } else if(num <= 32 && num > 16){
        
      } else if(num <= 16 && num > 8){
        for(var f = 0; f < 1; f++){
          for(var s = 0; s < 2; s++){
            for(var c = 0; c < 2; c++){
              for( var o = 0; o < 2; o++){
                newInsert(lastID, "octavos", id)
                lastIDOctavos.push(lastID)
                lastID++
              }
              newInsert(lastID, "cuartos", id, lastIDOctavos.pop(), lastIDOctavos.pop())
              lastIDCuartos.push(lastID)
              lastID++
            }
            newInsert(lastID, "semifinal", id, lastIDCuartos.pop(), lastIDCuartos.pop())
            lastIDSemifinales.push(lastID)
            lastID++
          }
          newInsert(lastID, "final", id, lastIDSemifinales.pop(), lastIDSemifinales.pop())
          lastID++
        }
      } else if(num <= 8 && num > 4){
        for(var f = 0; f < 1; f++){
          for(var s = 0; s < 2; s++){
            for(var c = 0; c < 2; c++){
              newInsert(lastID, "cuartos", id, null, null)
              lastIDCuartos.push(lastID)
              lastID++
            }
            newInsert(lastID, "semifinal", id, lastIDCuartos.pop(), lastIDCuartos.pop())
            lastIDSemifinales.push(lastID)
            lastID++
          }
          newInsert(lastID, "final", id, lastIDSemifinales.pop(), lastIDSemifinales.pop())
          lastID++
        }
      } else{

      }
    }
  }

  async function newInsert(idGame, name, idTorneo, lastGameLocal, lastGameVisitant){
    try {
      const { error } =  await supabase.from("match").insert({ 
        id: idGame,
        name: name,
        last_gameLocal: lastGameLocal,
        last_gameVisitant: lastGameVisitant,
        scheduled: null,
        punts_local: 0,
        punts_visitant: 0,
        torneig: idTorneo,
        equip_local: null,
        equip_visitant: null
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
    
  }

  const handleInsert = async (nom_torneig, esport, tipus_torneig, num_persones) => {
    try {
      setLoading(true);
      const { error } =  await supabase.from("torneig").insert({ nom_torneig: nom_torneig, esport: esport.id, tipus_torneig: tipus_torneig.id, profile: user.id, num_persones: num_persones });
      if (error) throw error;
      handleRedirection()

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
                if(num_persones<=64 || num_persones>2){
                  handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
                } else{
                  alert("Necesitas introducir un numero de personajes más grande que 1 y más pequeño que 65")
                }
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
        <div className="form_inputs">
          <input
            className="inputField"
            type="number"
            placeholder="Participants"
            value={num_persones}
            onChange={(e) => setNumPersones(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if(num_persones<=64 || num_persones>2){
                  handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
                } else{
                  alert("Necesitas introducir un numero de personajes más grande que 1 y más pequeño que 65")
                }
              }
            }}
          />
        </div>
        <div className="register_button">
          <BotonAction
            type="secondary"
            size="medium"
            action={(e) => {
              if(num_persones<=64 || num_persones>2){
                handleInsert(nom_torneig, esportValue, tipusValue, num_persones);
              } else{
                alert("Necesitas introducir un numero de personajes más grande que 1 y más pequeño que 65")
              }
            }}
            textButton={loading ? <span>Loading</span> : <span>Create!</span>}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTournament