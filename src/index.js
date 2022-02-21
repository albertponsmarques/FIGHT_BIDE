import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App.js";
import Profile from "./AppNomod"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import Blog from "./Blog";
import Navigation from "./Navigation";
import Home from './App';

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/login" element={<Home />} />   
      <Route path="/blog" element={<Blog />}/>  
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/home" element={<Home />}>
      
=======
      <Route path="/home" element={<Main />}>
>>>>>>> 2f8ff90e98ab988c722cdaabd90130ce337470e1
      </Route>
=======
      <Route path="/home" element={<Main />}/>
>>>>>>> e23aaec6c7b9087009f3a6536186ce456e203af8
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
