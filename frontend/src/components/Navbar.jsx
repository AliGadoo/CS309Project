import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar({
  cartItems,
  setFilteredProducts,
  products,
}) {
  const [isNavOpen, setNavIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchInput); // Call handleSearch and pass the current query value
    }
  };

  const handleSearch = (e) => {
    const filtered = products.filter((product) => {
      const searchQuery = e.target.value.toLowerCase();
      const matchesSearchQuery =
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)

      return  matchesSearchQuery;
    });
    setFilteredProducts(filtered);
  };

  return (
    <nav className="navBar">
      <Logo />

      <h1 className="infinity">infinity</h1>
      <div className="wrapper">
        <img src={'default-profile-img.jpg'} className="anonymous" />
        <img src="/shoppingCart.png" className="shoppingCart" />
        {cartItems?.length && <span className="test">{cartItems?.length}</span>}
      </div>
      <div className="test2">
        <input
          type="text"
          className="search"
          placeholder="search in infinity"
          onInput={setSearchInput}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{
            backgroundColor: "rgb(41, 101, 220)",
            borderRadius: "10%",
            cursor: "pointer",
          }}
          onClick={() => handleSearch(searchInput)}
        >
          <circle cx="11" cy="11" r="6"></circle>
          <line x1="16" y1="16" x2="22" y2="22"></line>
        </svg>
      </div>
    </nav>
  );
}
