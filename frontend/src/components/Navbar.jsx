import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import Logo from './Logo'
import './Navbar.css'

export default function Navbar({ cartItems, setFilteredProducts, products, currentUser }) {
  const navigate = useNavigate();

  const [isNavOpen, setNavIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(null);

  let activeUser = currentUser;

  if (!activeUser) {
    try {
      const storedUser = localStorage.getItem("currentUser");
      activeUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      activeUser = null;
    }
  }

  const isLoggedIn = Boolean(activeUser?.user);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e); // Pass event to handleSearch
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleClickProfile = () => {
    navigate(isLoggedIn ? "/userProfile" : "/signup");
  };

  const handleClickCart = () => {
    navigate(isLoggedIn ? "/cart" : "/signup");
  };

  return (
    <nav className="navBar">
      <Logo />
      <h1 className="infinity">infinity</h1>
      {activeUser?.user?.isAdmin ? (
        <div className="admin-panel">
          <Link to="/addProduct">add product</Link>
        </div>
      ) : (
        <div className="wrapper">
          <img
            onClick={handleClickProfile}
            src={activeUser?.user?.image || "/default-profile-img.jpg"}
            className="anonymous"
            alt="profile"
            onError={(e) => { e.target.src = "./default-profile-img.jpg"; }}
          />
          <img
            onClick={handleClickCart}
            src="/shoppingCart.png"
            className="shoppingCart"
            alt="cart"
          />
          {cartItems?.length > 0 && <span className="test">{cartItems.length}</span>}
        </div>
      )}
      <div className="test2">
        <input
          type="text"
          className="search"
          placeholder="search in infinity"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ backgroundColor: "rgb(41, 101, 220)", borderRadius: "10%", cursor: "pointer" }}
          onClick={() => handleSearch({ target: { value: searchInput } })}
        >
          <circle cx="11" cy="11" r="6"></circle>
          <line x1="16" y1="16" x2="22" y2="22"></line>
        </svg>
      </div>
    </nav>
  );
}
