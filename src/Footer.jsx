import React from "react";
import "./css/footer.css"

function Footer() {
  return (
    <div className="footer">
      <footer className="py-1 bg-black fixed-bottom">
        <div className="container">
          <p className="footer-text">
            Copyright &copy; Your Website 2020
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;