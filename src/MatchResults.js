import React, { Component } from "react";
import './css/modal.css';
import './css/tournament.css'
import AsyncSelect from "react-select/async";
import {supabase} from './supabaseClient'
import { useEffect, useState } from 'react'
import getEquip from "./getEquipByID";

class MatchResults extends Component {

  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    window.location.reload(false);
  };
  
  
  render() {
    return (
      <div>
        <div className='col-12'>
          <Modal show={this.state.show} handleClose={this.hideModal} idTournament={this.props.tournamentID}>
            <p className="titol">Match Results</p>
          </Modal>
          <button className="btn-results" onClick={this.showModal}>
            change results
          </button>
        </div>
      </div>
    );
  }
}



const Modal = ({ handleClose, show, children, idTournament}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [matches, setMatches] = useState([])
  const [equips, setEquips] = useState([])
  const [loading, setLoading] = useState(false);
  const us = supabase.auth.user()

  useEffect(() => {
    fetchEquips()
    fetchMatches()
  }, [])

  async function updateUserTeam(idTeam, email){
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .update({ team: idTeam.id })
      .match({ email: email })

      console.log(error)
    
    setLoading(false);
  }

  async function fetchMatches(){
    const { data } = await supabase
      .from('match')
      .select('*')
      .eq('torneig', idTournament)

      setMatches(data)
  }
  
  async function fetchEquips(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      
      setEquips(data)
  }

  let valueTeam = null
  
  const handleInputChangeTeam = value => {
    valueTeam = value
    updateUserTeam(valueTeam, us.email)
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="container-modal">
          <h2>{children}</h2>

          <div className="form_inputs">
            {
              matches.map(match => {
                <div key={match.id}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{getEquip(match.equip_local, equips)}</td>
                        <td>{match.punts_local}</td>
                      </tr>
                      <tr>
                        <td>{getEquip(match.equip_visitant, equips)}</td>
                        <td>{match.punts_visitant}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> 
              })
            }
          </div>
          <button onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default MatchResults