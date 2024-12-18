import { Link } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import ProductList from "./ProductList";

const Home = () => {

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <ProductList />



      <div class="last">
        <div class="container">
            <div class="last1">
                <a href="#demo"> <i class="fa-brands fa-facebook-f"></i></a>
                <a href="#demo"> <i class="fa-brands fa-twitter"></i></a>
                <a href="#demo"><i class="fa-brands fa-google"></i></a>
                <a href="#demo"> <i class="fa-brands fa-github"></i></a>
            </div>
            <p class="be">Copy Right 2018 © By<a href="#demo">Theme-fair</a> All Rights Reserved</p>
        </div>
    </div>
    </div>
  );
};

export default Home;
