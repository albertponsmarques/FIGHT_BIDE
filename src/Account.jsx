import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Avatar from "./Avatar";
import "./css/account.css";
import "./css/awesomeButtons.css";
import BotonAction from "./components/BotonAction";
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
  const [birth_date, setBirth_date] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  var imageUrl = "https://ogkihnuicantvuogoywo.supabase.co/storage/v1/object/public/avatars/" + avatar_url;

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
        .select("username, avatar_url, birth_date, country, city, phone")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setBirth_date(data.birth_date);
        setCountry(data.country);
        setCity(data.city);
        setPhone(data.phone);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    birth_date,
    country,
    city,
    phone,
    imageUrl,
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        avatar_url,
        email: user.email,
        birth_date,
        country,
        city,
        phone,
        imageUrl,
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
            updateProfile({
              username,
              avatar_url: url,
              birth_date,
              country,
              city,
              phone,
              imageUrl,
            });
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
      <h6 className="label_text">phone</h6>
      <div className="inputDiv">
        <label htmlFor="phone" />
        <input
          id="phone"
          type="tel"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h6 className="label_text">birth date</h6>
      <div className="inputDiv">
        <label htmlFor="birth_date" />
        <input
          id="birthday"
          type="date"
          value={birth_date || ""}
          onChange={(e) => setBirth_date(e.target.value)}
        />
      </div>
      <h6 className="label_text">country</h6>
      <div className="inputDiv">
        <label htmlFor="country" />
        <input
          id="country"
          type="text"
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <h6 className="label_text">city</h6>
      <div className="inputDiv">
        <label htmlFor="city" />
        <input
          id="city"
          type="text"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="AButton" style={{ position: "relative", zIndex: "0" }}>
        <BotonAction
          type="primary"
          size="medium"
          action={() =>
            updateProfile({
              username,
              birth_date,
              country,
              city,
              phone,
              imageUrl,
            })
          }
          textButton={loading ? "Loading ..." : "Update"}
        />
      </div>

      <div className="AButton" style={{ position: "relative", zIndex: "0" }}>
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
