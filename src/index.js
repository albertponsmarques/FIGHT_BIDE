import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App.js";
import Profile from "./Account_nomod.jsx"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import Blog from "./Blog";
import Navigation from "./Navigation";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/login" element={<Profile />} />   
      <Route path="/blog" element={<Blog />}/>  
      <Route path="/home" element={<Home />}>
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
