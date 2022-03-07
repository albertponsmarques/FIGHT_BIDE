import React from "react";
import BotonAction from "../BotonAction";
import "../css/modal.css";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          {" "}
          <h1 className="titleText"> Are you sure you want to sign out? </h1>{" "}
        </div>
        <div className="foooter">
          <BotonAction
            type="secondary"
            size="small"
            action={() => closeModal(false)}
            textButton="cancel"
          />
          <BotonAction
            type="primary"
            size="small"
            action={() => console.clear}
            textButton="continue"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
