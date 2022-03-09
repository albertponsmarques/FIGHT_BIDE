import { React, useState } from "react";
import { Outlet } from "react-router-dom";
import BotonAction from "./BotonAction";
import Modal from "./components/Modal";
import "./css/test.css";
import ModalLib from "react-modal";

ModalLib.setAppElement("#root");

function Blog() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="home">
      <div className="container">
        <h1 className="pageTitle">Blog page</h1>
        <button onClick={toggleModal}>Open modal</button>
        <BotonAction
          type="secondary"
          size="medium"
          action={toggleModal}
          textButton="open modal"
        />
      </div>
      <ModalLib
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div>My modal dialog.</div>
        <button onClick={toggleModal}>Close modal</button>
      </ModalLib>
    </div>
  );
}

export default Blog;
