import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
      <Route path="/home" element={<Main />}/>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
