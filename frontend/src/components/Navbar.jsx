import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar({
  cartItems,
  setFilteredProducts,
  products,
  currentUser
}) {

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const activeUser = currentUser || storedUser;
    const isLoggedIn = activeUser && activeUser.user;
    const navigate = useNavigate();

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

  const handleClickProfile = () =>{
    if(isLoggedIn){
      navigate("/userProfile")
    }else {
      navigate("/signup")
    }
  }

  const handleClickCart = () => {
    if(isLoggedIn){
      navigate("/cart")
    }else {
      navigate("/signup")
    }
  }
  return (
    <nav className="navBar">
      <Logo />

      <h1 className="infinity">infinity</h1>
      {activeUser.user.isAdmin ?
       <div className="admin-panel">
        <Link to={'/addProduct'}>add product</Link>
       </div>
       :<div className="wrapper">
        <img onClick={handleClickProfile} src={activeUser.user.image || "/default-profile-img.jpg"} className="anonymous" alt="profile"
            onError={(e) => {
              e.target.src = "./default-profile-img.jpg";
            }}
        />
        <img onClick={handleClickCart} src="/shoppingCart.png" className="shoppingCart"  alt="cart"/>
        {cartItems?.length && <span className="test">{cartItems?.length}</span>}
      </div>}
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
