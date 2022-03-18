import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Register from "./Register";
import AccountNoMod from "./AppNomod";
import Tournaments from "./Tournaments";
import Home from "./App";
import Test from "./Test.jsx";
import Tournament from "./Tournament";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/home" element={<Main />} />
      <Route path="/login" element={<Home />} />
      <Route path="/accountnomod" element={<AccountNoMod />} />
      <Route path="/FIGHT_BIDE" element={<Main />} />
      <Route path="/test" element={<Test />} />
      <Route path='/tournament/:id' element={<Tournament/>} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
