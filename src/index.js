import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import Blog from "./Blog";
import Navigation from "./Navigation";
import Home from "./App";
import Register from "./Register";
import AccountNoMod from "./AppNomod";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/home" element={<Main />} />
      <Route path="/login" element={<Home />} />
      <Route path="/accountnomod" element={<AccountNoMod />} />
      <Route path="/FIGHT_BIDE" element={<Main />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
