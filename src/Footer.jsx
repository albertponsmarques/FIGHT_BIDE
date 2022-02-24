import React from "react";
import "./css/footer.css"

function Footer() {
  return (
    <div className="footer">
      <footer className="py-1 bg-black fixed-bottom">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; FIGHT-BIDE 2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;