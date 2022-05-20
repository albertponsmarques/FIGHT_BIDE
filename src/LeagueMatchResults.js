import React, { Component } from "react";
import './css/modal.css';
import './css/tournament.css'
import {supabase} from './supabaseClient'
import { useEffect, useState } from 'react'
import getEquip from "./getEquipByID";
import BotonAction from './components/BotonAction'

class 
LeagueMatchResults extends Component {

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
          <Modal show={this.state.show} handleClose={this.hideModal} idTournament={this.props.tournamentID} own={this.props.own}>
            <p className="titol">League Matches</p>
          </Modal>
          <BotonAction
            type="secondary"
            size="large"
            action={this.showModal}
            textButton={
              this.props.own ?
                "change results"
              :
                "view results"
            }/>
        </div>
      </div>
    );
  }
}



const Modal = ({ handleClose, show, children, idTournament, own}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [matches, setMatches] = useState([])
  const [equips, setEquips] = useState([])

  useEffect(() => {
    fetchEquips()
    fetchMatches()
  }, [])

  async function fetchMatches(){
    const { data } = await supabase
      .from('league_matches')
      .select('*')
      .eq('tournament', idTournament)
      .order('id', { ascending: true })


      setMatches(data)
  }

  async function fetchCheckMatches(id){
    const { data } = await supabase
      .from('league_matches')
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

  async function fetchLeagueTeam(idTeam, idTournament){
    const { data } = await supabase
      .from('league_table')
      .select('*')
      .eq('team', idTeam)
      .eq('tournament', idTournament)
      .single()

      console.log(data)
      return data
  }

  function checkMatches(id){
    console.log(matches)
    fetchCheckMatches(id).then(async checkedMatch =>(
      (checkedMatch.punts_local > checkedMatch.punts_visitant) ?
        checkedMatch.pointsAccredited === 0 ?
          winsGame(checkedMatch.equip_local, checkedMatch.tournament, 1, id, 3)
        :
          checkedMatch.pointsAccredited === 2 ?
            winsGame(checkedMatch.equip_visitant, checkedMatch.tournament, 1, id, 3)
          :
            console.log()

        
        
      :
        console.log(),








      (checkedMatch.punts_visitant > checkedMatch.punts_local) ?
        givePoints(checkedMatch.equip_visitant, checkedMatch.tournament, 2, id, 3)
      :
        console.log(),

      (checkedMatch.punts_local === checkedMatch.punts_visitant) ?
        giveTie(checkedMatch, checkedMatch.tournament, 3, id)
      :
        console.log()
    ))
  }

  function winsGame(equip, idTournament, idMatch){
    givePoints(equip, idTournament, 1, idMatch, 3)
  }

  function loseGame(){
    
  }

  function giveTie(match, idTournament, pointsAccredited, idMatch){
    givePoints(match.equip_local, idTournament, pointsAccredited, idMatch, 1)
    givePoints(match.equip_visitant, idTournament, pointsAccredited, idMatch, 1)
  }

  function givePoints(idTeam, idTournament, pointsAccredited, idMatch, points){
    fetchLeagueTeam(idTeam, idTournament).then(async team =>(
      await supabase
        .from('league_table')
        .update({ points: team.points+points })
        .match({ team: idTeam, tournament: idTournament }),
      await supabase
        .from('league_matches')
        .update({ pointsAccredited: pointsAccredited, numberPoints: points })
        .match({ id: idMatch })
    ))
  }

  function takeTie(match, idTournament, pointsAccredited, idMatch){
    takePoints(match.equip_local, idTournament, pointsAccredited, idMatch, -1)
    takePoints(match.equip_visitant, idTournament, pointsAccredited, idMatch, -1)
  }

  function takePoints(idTeam, idTournament, pointsAccredited, idMatch, points){
    fetchLeagueTeam(idTeam, idTournament).then(async team =>(
      await supabase
        .from('league_table')
        .update({ points: team.points+points })
        .match({ team: idTeam, tournament: idTournament }),
      await supabase
        .from('league_matches')
        .update({ pointsAccredited: pointsAccredited, numberPoints: points })
        .match({ id: idMatch })
    ))
  }

  async function updateMatch(id, side, value, checkedLocal, checkedVisitant){
    side === "punts_local" ? await supabase
                                    .from('league_matches')
                                    .update({ punts_local: value, checkedLocal: true})
                                    .match({ id: id })
    :
      console.log()

    side === "punts_visitant" ? await supabase
                                    .from('league_matches')
                                    .update({ punts_visitant: value, checkedVisitant: true})
                                    .match({ id: id })
    :
      console.log()

    side === "scheduled" ? await supabase
                                    .from('league_matches')
                                    .update({ scheduled: value })
                                    .match({ id: id })
    :
      checkMatches(id)

  }


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="container-modal">
          <h2>{children}</h2>

          <div className="form_inputs results">
            To be able to save the Results, you will have to manually press Enter on every input
            <div className="row" style={{display : 'flex', overflow : 'hidden'}}>
              {
                matches.map(match => (
                  <div key={match.id} className='col-5'>
                    <Match match={match} equips={equips} update={updateMatch} own={own}/>
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
      equip_local: this.props.match.equip_local,
      equip_visitant: this.props.match.equip_visitant,
      punts_local: this.props.match.punts_local,
      punts_visitant: this.props.match.punts_visitant,
      scheduled: this.props.match.scheduled,
      checkedLocal: this.props.match.checkedLocal,
      checkedVisitant: this.props.match.checkedVisitant,
      own: this.props.own
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateMatch = this.props.update
  }

  handleChange(id, side, value, bandera) {
    side === "punts_local" ? this.setState({punts_local: value}) : console.log()
    side === "punts_visitant" ? this.setState({punts_visitant: value}) : console.log()
    side === "scheduled" ? this.setState({scheduled: value}) : console.log()

    side === "scheduled" ? this.updateMatch(this.state.id,side,value, this.state.checkedLocal, this.state.checkedVisitant) : console.log()


    console.log("ID: " + id)
    console.log("SIDE: " + side)
    console.log("VALUE: " + value)

    bandera ? 
      setTimeout(() => {
        side === "punts_local" ? this.setState({punts_local: value}) : console.log()
        side === "punts_visitant" ? this.setState({punts_visitant: value}) : console.log()
        this.updateMatch(this.state.id,side,value, this.state.checkedLocal, this.state.checkedVisitant)
      }, 200)
    : 
      console.log()
  }


  render() {
    return (
      <div key={this.state.id}>
        <table>
          <tbody>
            <tr>
              <td className="titol-tabla" style={{width: '350px'}}>
                <div className="row">
                  <div className="col-2 name">
                    League
                  </div>
                  <div className="col-9 date-style">
                    {
                      this.state.scheduled === null ?
                      "No time set"
                      :
                      this.state.scheduled.substring(0,10) + " " + this.state.scheduled.substring(11,16)
                    }
                  </div>
                </div>
              </td>
              <td className="titol-tabla" style={{width: '50px'}}>
                {(this.state.own === false) ? 
                  <input
                    className="calendar"
                    type="datetime-local"
                    placeholder="kk"
                    value={this.state.scheduled}
                    readOnly
                  />
                :
                  <input
                    className="calendar"
                    type="datetime-local"
                    placeholder="kk"
                    value={this.state.scheduled}
                    onChange={(e) => this.handleChange(this.state.id, "scheduled", e.target.value, true)}
                  />
                }
              </td>
            </tr>
            <tr>
              <td>{getEquip(this.state.equip_local, this.props.equips)}</td>
              <td>
                {(this.state.own === false) ? 
                  <input
                    className="inputField-result"
                    style={{background : 'gray'}}
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_local}
                    readOnly
                  />
                :
                  <input
                    className="inputField-result"
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_local}
                    onChange={(e) => {
                      this.handleChange(this.state.id, "punts_local", e.target.value, false)
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        this.handleChange(this.state.id, "punts_local", e.target.value, true)
                      }
                    }}
                  />
                }
              </td>
            </tr>
            <tr>
              <td>{getEquip(this.state.equip_visitant, this.props.equips)}</td>
              <td>
                {(this.state.own === false) ? 
                  <input
                    className="inputField-result"
                    style={{background : 'gray'}}
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_visitant}
                    readOnly
                  />
                :
                  <input
                    className="inputField-result"
                    type="numeric"
                    placeholder="points"
                    value={this.state.punts_visitant}
                    onChange={(e) => {
                      this.handleChange(this.state.id, "punts_visitant", e.target.value, false)
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        this.handleChange(this.state.id, "punts_visitant", e.target.value, true)
                      }
                    }}
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

export default LeagueMatchResults