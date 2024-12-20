import { Link, useLocation } from "react-router-dom";   
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
    const [isNavOpen, setNavIsOpen] = useState(false);
    const location = useLocation();  

    const handleToggle = () => {
        setNavIsOpen(!isNavOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <i className={isNavOpen ? "fa-solid fa-times edit2" : "fa-solid fa-bars edit2"} id="press" onClick={handleToggle}></i>
                <h1><i className="fa-solid fa-cart-shopping"></i></h1>
                <div className={isNavOpen ? "nav-links open" : "nav-links"}>
                    <ul id="ul">
                        <li>
                            <Link
                                to="/"
                                className={location.pathname === "/" ? "nav-link active" : "nav-link"} 
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className={location.pathname === "/login" ? "nav-link active" : "nav-link"}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={location.pathname === "/signup" ? "nav-link active" : "nav-link"}
                            >
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gallery"
                                className={location.pathname === "/gallery" ? "nav-link active" : "nav-link"}
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/order"
                                className={location.pathname === "/order" ? "nav-link active" : "nav-link"}
                            >
                                Order
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
