import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Avatar from "./Avatar";
import Boton from "./Boton";
import "./css/account.css";
import "./css/awesomeButtons.css";
import BotonAction from "./BotonAction";
import ModalLib from "react-modal";
import Modal from "./components/Modal";

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

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
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
        .eq("user_id", user.id)
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

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        email: user.email,
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      alert("user updated");
    }
  }

  return (
    <div className="form-widget">
      <h3 className="account_title">PROFILE</h3>
      <div className="avatar">
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
      </div>
      <h6 className="label_text">email</h6>
      <div className="inputDiv">
        <label htmlFor="email" />
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <h6 className="label_text">username</h6>
      <div className="inputDiv">
        <label htmlFor="username" />
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <h6 className="label_text">website</h6>
      <div className="inputDiv">
        <label htmlFor="website" />
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="AButton" style={{ position: 'relative', zIndex: '0' }}>
        <BotonAction
          type="primary"
          size="medium"
          action={() => updateProfile({ username, website })}
          textButton={loading ? "Loading ..." : "Update"}
        />
      </div>

      <div className="AButton" style={{ position: 'relative', zIndex: '0' }}>
        <BotonAction
          type="secondary"
          size="medium"
          action={toggleModal}
          textButton="Sign Out"
        />
      </div>
      <div style={{ position: "relative", zIndex: "1" }}>
        <ModalLib
          isOpen={isOpen}
          onRequestClose={toggleModal}
          style={customStyles}
        >
          <Modal closeModal={toggleModal} />
        </ModalLib>
      </div>
    </div>
  );
}
