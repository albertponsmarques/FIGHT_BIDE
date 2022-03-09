import { React, useState } from "react";
import Modal from "./components/Modal";
import "./css/test.css";
import ModalLib from "react-modal";

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
      </div>
      <ModalLib
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
      >
        <Modal closeModal={toggleModal} />
      </ModalLib>
    </div>
  );
}

export default Blog;
