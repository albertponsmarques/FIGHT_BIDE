import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import BotonAction from "./components/BotonAction";
import { supabase } from "./supabaseClient";
import './css/createTournament.css'


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
  const [lastTournament, setLastTournament] = useState([]);


  async function fetchLastId(){
    const { data } = await supabase
      .from('match')
      .select('id')
      .order("id", { ascending: false })
      .limit(1)

      setLastID(data)
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
      console.log(data)
      return data

    }

  const user = supabase.auth.user();

  useEffect(() => {
    // call the async fetchData function
    fetchLastId()
    fetchLastTournament()
  }, [])


  function handleRedirection(id, tournamentType) {
    tournamentType === 1 ? insertDirectElimination(id) : console.log(id)
  }


  async function insertDirectElimination(id){
    try {
      setRefreshing(true);
      getMatch(num_persones, id)
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setRefreshing(false);
    }
  }

  let lastID64Round = []
  let lastIDDieciseisavos = []
  let lastIDOctavos = []
  let lastIDCuartos = []
  let lastIDSemifinales = []

  const nameArray1 = ["final"]
  const nameArray2 = ["semifinal","semifinal"]
  const nameArray4 = ["cuartos","cuartos","cuartos","cuartos"]
  const nameArray8 = ["octavos","octavos","octavos","octavos","octavos","octavos","octavos","octavos"]
  const nameArray16 = ["dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos", "dieciseisavos"]
  const nameArray32 = ["Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64",  "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64", "Ronda de 64"]



  function getMatch(num, id){
    console.log(ultimaID)
    if(ultimaID != null){
      let lastID = ultimaID[0].id
      lastID++
      
      if(num <= 64 && num > 32){
        doRound64(lastID, id)
      } else if(num <= 32 && num > 16){
        doDieciseisavos(lastID, id)
      } else if(num <= 16 && num > 8){
        doOctavos(lastID, id)
      } else if(num <= 8 && num > 4){
        doCuartos(lastID, id)        
      } else{
        doSemifinals(lastID, id)
      }
    }
  }

  function doRound64(lastID, tournamentID){
    let id = lastID
    for(var c = 0; c < 32; c++){
      newInsert(id, nameArray32.pop(), tournamentID, null, null)
      lastID64Round.push(id)
      id++
    }
    setTimeout(() => { doDieciseisavos(id, tournamentID) }, 500);
  }

  function doDieciseisavos(lastID, tournamentID){
    let id = lastID
    for(var c = 0; c < 16; c++){
      newInsert(id, nameArray16.pop(), tournamentID, lastID64Round.pop(), lastID64Round.pop())
      lastIDDieciseisavos.push(id)
      id++
    }
    setTimeout(() => { doOctavos(id, tournamentID) }, 500);
  }

  function doOctavos(lastID, tournamentID){
    let id = lastID
    for(var c = 0; c < 8; c++){
      newInsert(id, nameArray8.pop(), tournamentID, lastIDDieciseisavos.pop(), lastIDDieciseisavos.pop())
      lastIDOctavos.push(id)
      id++
    }
    setTimeout(() => { doCuartos(id, tournamentID) }, 500);
  }

  function doCuartos(lastID, tournamentID){
    let id = lastID
    for(var c = 0; c < 4; c++){
      newInsert(id, nameArray4.pop(), tournamentID, lastIDOctavos.pop(), lastIDOctavos.pop())
      lastIDCuartos.push(id)
      id++
    }
    setTimeout(() => { doSemifinals(id, tournamentID) }, 500);
  }

  function doSemifinals(lastID, tournamentID){
    let id = lastID
    let cuartosID = lastIDCuartos.pop()
    newInsert(id, nameArray2.pop(), tournamentID, cuartosID - 3, cuartosID - 2)
    lastIDSemifinales.push(id)
    id++
    newInsert(id, nameArray2.pop(), tournamentID, cuartosID - 1, cuartosID)
    lastIDSemifinales.push(id)
    id++
    setTimeout(() => { doFinal(id, tournamentID) }, 500);
  }

  function doFinal(lastID, tournamentID){
    let id = lastID
    newInsert(id, nameArray1.pop(), tournamentID, lastIDSemifinales.pop(), lastIDSemifinales.pop())
    setTimeout(() => window.location.replace('tournament/' + tournamentID), 500);
  }

  async function newInsert(lastID, name, id, lastIDVisi, lastIDLocal){
    console.log("lastID: " + lastID + " - name: " + name + " - id: " + id + " - lastIDLocal: " + lastIDLocal + " - lastIDVisi: " + lastIDVisi)
    try {
      const { error } =  await supabase.from("match").insert({ 
        id: lastID,
        name: name,
        last_gameLocal: lastIDLocal,
        last_gameVisitant: lastIDVisi,
        scheduled: null,
        punts_local: 0,
        punts_visitant: 0,
        torneig: id,
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
      const { data, error } =  await supabase.from("torneig").insert({ nom_torneig: nom_torneig, esport: esport.id, tipus_torneig: tipus_torneig.id, profile: user.id, num_persones: num_persones, img:  esport.img_url});
      if (error) throw error;
      console.log(data)
      data.map(dat => (
        handleRedirection(dat.id, tipus_torneig.id)
      ))

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

  const inputStyle = {
    control: styles => ({ ...styles, backgroundColor: '#101010', color: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : '#101010',
        color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
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
              user === null ? 
                alert("You need an account to create a new Tournament") 
              :
                (num_persones<=64 && num_persones>2) ?
                  handleInsert(nom_torneig, esportValue, tipusValue, num_persones)
                :
                  alert("Insert a value between 2 and 64, both included ")
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
            styles={inputStyle}
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
            styles={inputStyle}
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
                user === null ? 
                alert("You need an account to create a new Tournament") 
              :
                (num_persones<=64 && num_persones>2) ?
                  handleInsert(nom_torneig, esportValue, tipusValue, num_persones)
                :
                  alert("Insert a value between 2 and 64, both included ")
              }
            }}
          />
        </div>
        <div className="register_button">
          <BotonAction
            type="secondary"
            size="medium"
            action={(e) => {
              user === null ? 
                alert("You need an account to create a new Tournament") 
              :
                (num_persones<=64 && num_persones>2) ?
                  handleInsert(nom_torneig, esportValue, tipusValue, num_persones)
                :
                  alert("Insert a value between 2 and 64, both included ")
            }}
            textButton={loading ? <span>Loading</span> : <span>Create!</span>}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTournament