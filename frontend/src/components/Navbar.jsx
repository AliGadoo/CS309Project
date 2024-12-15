import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
    const [isNavOpen, setNavIsOpen] = useState(false);

    const handleToggle = () => {
        setNavIsOpen(!isNavOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">

                <i className="fa-solid fa-bars edit2" id="press" onClick={handleToggle}></i>

                <h1><i className="fa-solid fa-cart-shopping"></i></h1>
                <div className={isNavOpen ? "nav-links open" : "nav-links"}>
                    <ul >
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                        <li>
                            <Link to="/gallery" className="nav-link">Gallery</Link>
                        </li>
                        <li>
                            <Link to="/order" className="nav-link">Order</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
