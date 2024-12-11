import { Link } from "react-router-dom";
import "./Home.css";
import ProductList from "./ProductList";

const Home = () => {
    return ( 
        <div className="home-container">
            <h1>Home</h1>
            <p>This is the home page</p>
            
            
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
            <ProductList/>
        </div>
     );
}
 
export default Home;