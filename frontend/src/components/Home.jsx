import { Link } from "react-router-dom";
import "./Home.css";
import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import Categories from "./Categories";

const Home = ({ currentUser }) => {
  const categories = [
    "AllProducts",
    "Smartphones",
    "Laptops",
    "Tablets",
    "TVs",
    "Headphones",
    "Speakers",
    "Cameras",
    "Gaming",
    "SmartHome",
    "Accessories",
  ];
  const [cartItems, setCartItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
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
        currentCategory={currentCategory}
        categories={categories}
      />
      <Categories
        setFilteredProducts={setFilteredProducts}
        categories={categories}
        currentCategory={currentCategory}
        products={products}
        setCurrentCategory={setCurrentCategory}
      />
      <ProductList
        setCartItems={setCartItems}
        cartItems={cartItems}
        currentUser={currentUser}
        products={products}
        setProducts={setFilteredProducts}
        filteredProducts={filteredProducts}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        categories={categories}
      />
    </div>
  );
};

export default Home;
