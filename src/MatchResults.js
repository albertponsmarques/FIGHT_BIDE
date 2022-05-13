import React, { Component } from "react";
import './css/modal.css';
import './css/tournament.css'
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
    window.location.reload(false)
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

  async function fetchMatches(){
    const { data } = await supabase
      .from('match')
      .select('*')
      .eq('torneig', idTournament)
      .order('id', { ascending: true })


      setMatches(data)
  }

  async function fetchCheckMatches(id){
    const { data } = await supabase
      .from('match')
      .select('*')
      .eq('id', id)
      .single()


      return data
  }
  
  async function fetchEquips(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      
      setEquips(data)
  }

  async function fetchMatchesLocalVisitant(id){
    const { data } = await supabase
      .from('match')
      .select('*')
      .or('last_gameLocal.eq.' + id + ', last_gameVisitant.eq.' + id)

      .single()


      return data
  }

  async function checkMatches(id){
    fetchCheckMatches(id).then(match => {
      if(match.punts_local > match.punts_visitant){
        fetchMatchesLocalVisitant(id).then(value => {
          winsGame(id, value, match.equip_local)
        })
      } else if(match.punts_local < match.punts_visitant){
        fetchMatchesLocalVisitant(match.id).then(value => {
          winsGame(id, value, match.equip_visitant)
        })
      } else{

      }
    })
  }

  async function winsGame(id, match, team){
    id === match.last_gameLocal ? await supabase
                                    .from('match')
                                    .update({ equip_local: team })
                                    .match({ id: match.id })
    :
    console.log()

    id === match.last_gameVisitant ? await supabase
                                    .from('match')
                                    .update({ equip_visitant: team })
                                    .match({ id: match.id })
    :
    console.log()
  }

  async function updateMatch(id, side, value){
    side === "punts_local" ? await supabase
                                    .from('match')
                                    .update({ punts_local: value })
                                    .match({ id: id })
    :
    console.log()

    side === "punts_visitant" ? await supabase
                                    .from('match')
                                    .update({ punts_visitant: value })
                                    .match({ id: id })
    :
    console.log()

    checkMatches(id)
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="container-modal">
          <h2>{children}</h2>

          <div className="form_inputs results">
            <div className="row" style={{display : 'flex', overflow : 'scroll'}}>
              {
                matches.map(match => (
                  match.name === "final" ?
                  <div key={match.id} className='col-12'>
                    <Match match={match} equips={equips} update={updateMatch}/>
                  </div>
                  :
                  <div key={match.id} className='col-5'>
                    <Match match={match} equips={equips} update={updateMatch}/>
                  </div>
                ))
              }
            </div>
          </div>
          <button onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};


class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.id,
      name: this.props.match.name,
      equip_local: this.props.match.equip_local,
      equip_visitant: this.props.match.equip_visitant,
      punts_local: this.props.match.punts_local,
      punts_visitant: this.props.match.punts_visitant,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateMatch = this.props.update
  }

  handleChange(id, side, value) {
    side === "punts_local" ? this.setState({punts_local: value}) : console.log()
    side === "punts_visitant" ? this.setState({punts_visitant: value}) : console.log()

    console.log("ID: " + id)
    console.log("SIDE: " + side)
    console.log("VALUE: " + value)

    this.updateMatch(this.state.id,side,value)
  }


  render() {
    return (
      <div key={this.state.id}>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>{this.state.name}</td>
            </tr>
            <tr>
              <td>{getEquip(this.state.equip_local, this.props.equips)}</td>
              <td>
                {this.state.equip_local !== null ? 
                  <input
                    className="inputField"
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_local}
                    onChange={(e) => this.handleChange(this.state.id, "punts_local", e.target.value)}
                  />
                  :
                  <input
                    className="inputField"
                    style={{background : 'gray'}}
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_visitant}
                    readOnly
                  />
                }  
              </td>
            </tr>
            <tr>
              <td>{getEquip(this.state.equip_visitant, this.props.equips)}</td>
              <td>
                {this.state.equip_visitant !== null ? 
                  <input
                    className="inputField"
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_visitant}
                    onChange={(e) => this.handleChange(this.state.id, "punts_visitant", e.target.value)}
                  />
                  :
                  <input
                    className="inputField"
                    style={{background : 'gray'}}
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_visitant}
                    readOnly
                  />
                }  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MatchResults