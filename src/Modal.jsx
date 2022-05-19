import React from "react";
import BotonAction from "../components/BotonAction";
import "../css/modal.css";
import { supabase } from "../supabaseClient";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          {" "}
          <h1 className="titleText">
            {" "}
            Are you sure you want to sign out?{" "}
          </h1>{" "}
        </div>
        <BotonAction className="boto1"
          type="secondary"
          size="medium"
          action={() => closeModal(false)}
          textButton="cancel"
        />
        <BotonAction className="boto1"
          type="primary"
          size="medium"
          action={() => supabase.auth.signOut()}
          textButton="continue"
        />
      </div>
    </div>
  );
}

export default Modal;
