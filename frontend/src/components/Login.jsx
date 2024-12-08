import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        //TODO: Add login logic
        console.log("Login submitted:", { email, password });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return ( 
       <div className="login-container">
           <h2>Login</h2>
           <form onSubmit={handleLogin}>
               <label htmlFor="email">Email:</label>
               <input type="email" id="email" value={email} onChange={handleEmailChange} />
               <label htmlFor="password">Password:</label>
               <input type="password" 
                required
                id="password" 
                value={password} 
                onChange={handlePasswordChange}
                />
               <button type="submit">Login</button>
               <p className="signup">Don't have an account? <Link to="/signup">Signup</Link></p>
               </form>
       </div>
     );
}
 
export default Login;