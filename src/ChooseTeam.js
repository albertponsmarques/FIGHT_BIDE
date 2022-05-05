import React, { Component } from "react";
import './css/modal.css';
import AsyncSelect from "react-select/async";
import {supabase} from './supabaseClient'
import BotonAction from "./components/BotonAction";
import { useEffect, useState } from 'react'
import getEquip from './getEquipByID';

class ChooseTeam extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      show2: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal2 = this.showModal2.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
  }


  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    window.location.reload(false);
  };

  showModal2 = () => {
    this.setState({ show2: true });
  };

  hideModal2 = () => {
    this.setState({ show2: false });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <div className='col-12'>
          Current Team: {getEquip(this.props.user.team, this.props.teams)}
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <p className="titol">Choose Your Current Team</p>
          </Modal>
          <button type="button" onClick={this.showModal}>
            Change Current Team
          </button>
        </div>
        <div className='col-12'>
          <ModalCreateTeam show={this.state.show2} handleClose={this.hideModal2}>
            <p className="titol">Create Your Team</p>
          </ModalCreateTeam>
          <button type="button" onClick={this.showModal2}>
            Create Your Team
          </button>
        </div>
      </div>
    );
  }
}



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const us = supabase.auth.user()

  useEffect(() => {
    fetchPosts()
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
          <AsyncSelect 
            defaultOptions cacheOptions 
            loadOptions={fetchEquips}
            getOptionLabel={e => e.nom}
            getOptionValue={e => e.id}
            onChange= {handleInputChangeTeam} 
           />
          </div>

          <button onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

const ModalCreateTeam = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [nameTeam, setNameTeam] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInsert = async (name) => {
    try {
      setLoading(true);
      const { data, error } =  await supabase.from('equip')
      .insert([
        { nom: name },
      ]);
      if (error) throw error;
      console.log(data)
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="container-modal">
          <h2>{children}</h2>

          <div className="form_inputs">
            <p className="text">
              Press ENTER to Save!
            </p>
            <input
              className="inputField"
              type="text"
              placeholder="Team Name"
              onChange={(e) => setNameTeam(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleInsert(nameTeam)
                }
              }}
            />
          </div>

          <button onClick={handleClose}>
            Close
          </button>

        </div>
      </section>
    </div>
  );
};

export default ChooseTeam