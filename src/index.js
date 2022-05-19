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
import Team from "./Team.jsx";
import Tournament from "./Tournament";
import CreateTournament from "./CreateTournaments";
import News from "./News"

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
      <Route path="/teams" element={<Team />} />
      <Route path='/tournament/:id' element={<Tournament/>} />
      <Route path='/create' element={<CreateTournament/>} />
      <Route path='/news' element={<News/>} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
