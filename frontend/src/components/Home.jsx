import { Link } from "react-router-dom";
import "./Home.css";
import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Navbar from "./Navbar";

const Home = ({ currentUser }) => {
  const [cartItems, setCartItems] = useState([]);
  const api_url = "http://localhost:5000/allProducts";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    <div>
      <Navbar
        cartItems={cartItems}
        setFilteredProducts={setFilteredProducts}
        products={products}
        currentUser={currentUser}
      />
      <ProductList
        setCartItems={setCartItems}
        cartItems={cartItems}
        currentUser={currentUser}
        products={products}
        setProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
      />
    </div>
  );
};

export default Home;
