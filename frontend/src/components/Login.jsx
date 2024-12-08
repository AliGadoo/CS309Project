import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = ({setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        const user = { email, password };
        fetch('http://localhost:5000/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              localStorage.setItem("currentUser", JSON.stringify(data));
              setUser(data);
            } else {
              console.error("Error: Response is empty or invalid.");
            }
          })
          .catch((error) => {
            console.error("Error during signup:", error);
          });
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
           <form>
               <label htmlFor="email">Email:</label>
               <input type="email" id="email" value={email} onChange={handleEmailChange} />
               <label htmlFor="password">Password:</label>
               <input type="password" 
                required
                id="password" 
                value={password} 
                onChange={handlePasswordChange}
                />
               <button onClick={handleSignup}>Login</button>
               <p className="signup">Don't have an account? <Link to="/signup">Signup</Link></p>
               </form>
       </div>
     );
}
 
export default Login;