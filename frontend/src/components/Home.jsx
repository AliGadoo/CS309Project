import { Link } from "react-router-dom";
import "./Home.css";
import React, { useState } from 'react';
import ProductList from "./ProductList";

const Home = () => {

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <ProductList />
    </div>
  );
};

export default Home;
