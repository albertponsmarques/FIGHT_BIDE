import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
import App from "./App.js";
import Profile from "./AppNomod"
=======
>>>>>>> 2f8ff90e98ab988c722cdaabd90130ce337470e1
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import Blog from "./Blog";
import Navigation from "./Navigation";
import Account from './Account';
import Home from './App';

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/login" element={<Home />} />   
      <Route path="/blog" element={<Blog />}/>  
<<<<<<< HEAD
      <Route path="/home" element={<Home />}>
      
=======
      <Route path="/home" element={<Main />}>
>>>>>>> 2f8ff90e98ab988c722cdaabd90130ce337470e1
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
