import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Avatar from "./AvatarNomod";
import Boton from "./Boton";
import BotonAction from "./BotonAction";
import "./css/account.css";
import "./css/awesomeButtons.css";
import ModalLib from "react-modal";
import Modal from "./components/Modal"

ModalLib.setAppElement("#root");

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(92, 0, 89, 0.75)",
  },
  content: {
    position: "absolute",
    top: "25%",
    left: "25%",
    right: "25%",
    bottom: "25%",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "60px",
  },
};

export default function AccountNomod({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOk, setIsOk] = useState(false)

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function toggleOk() {
    setIsOk(!isOk);
  }

  function signOutModal(){
    if (isOk){
      supabase.auth.signOut();
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <h1 className="account_title">PROFILE</h1>
      </div>
      <div className="avatar">
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
        />
      </div>
      <div className="inputDiv">
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className="inputDiv">
        <input id="username" type="text" value={username} disabled />
      </div>
      <div className="inputDiv">
        <input id="website" type="website" value={website} disabled />
      </div>

      <div className="update_div">
        <h3>Update your profile</h3>
        <Boton linkTo={"/login"} textButton={"update"} />

        <div className="AButton">
          <h3>Do you want to sign out?</h3>
        </div>
        <div>
          <button onClick={toggleModal}>Log out</button>
        </div>
        <ModalLib
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
      >
        <Modal closeModal={toggleModal} modalFunction={toggleOk} />
      </ModalLib>
      </div>
    </div>
  );
}
