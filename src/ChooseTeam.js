import React, { Component } from "react";
import './css/modal.css';
import AsyncSelect from "react-select/async";
import {supabase} from './supabaseClient'
import { useEffect, useState } from 'react'
import getEquip from './getEquipByID';

class ChooseTeam extends Component {

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
      <main>
        <p className='col-19'>
        Current Team: 
        {
          this.props.user.map(u => (
            getEquip(u.team, this.props.teams)
          ))
        }
      </p>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p className="titol">Choose Your Current Team</p>
        </Modal>
        <button type="button" onClick={this.showModal}>
          Change Current Team
        </button>
      </main>
    );
  }
}



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [posts, setPosts] = useState([])
  const us = supabase.auth.user()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function updateUserTeam(idTeam, email){
    const { data, error } = await supabase
      .from('profiles')
      .update({ team: idTeam.id })
      .match({ email: email })

      console.log(error)
  }

  async function fetchPosts(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      setPosts(data)
  }
  
  async function fetchEquips(){
    const { data } = await supabase
      .from('equip')
      .select('*')
      
      return data
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
          <AsyncSelect defaultOptions cacheOptions 
          loadOptions={fetchEquips}
          getOptionLabel={e => e.nom}
          getOptionValue={e => e.id}
          onChange= {handleInputChangeTeam} />
          </div>

          <button type="button" onClick={handleClose}>
            Save and Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChooseTeam