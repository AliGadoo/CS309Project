import { Link } from "react-router-dom";
import "./Home.css";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className="home-container">
      <div className="nav">
        <div className="con666">
          <div className="cu-logo">
            <h1><i class="fa-solid fa-cart-shopping"></i></h1>
            
          </div>
          <div className="nav-links" id="demo">
            <ul>
              <li className="e">
                <button className="active">Home</button>
              </li>
              <li className="e">
                <Link to="/login">
                  <button>Login</button>
                </Link>{" "}
              </li>
              <li className="e">
                <Link to="/signup">
                  <button>Signup</button>
                </Link>{" "}
              </li>
              <li className="e">
                <button>Gallry</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
