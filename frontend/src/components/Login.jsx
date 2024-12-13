import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          localStorage.setItem("currentUser", JSON.stringify(data));
          setUser(data);
          setIsValid(true);
          navigate(-1);
        } else {
          setIsValid(false);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setIsValid(false);
      });
  };

  return (
    <div className="ground">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="login-box">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
          </div>
          <div className="login-box">
            <input
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
          </div>
          <button type="submit" onClick={handleLogin}>
            <span className="position-absolute d-block"></span>
            <span className="position-absolute d-block"></span>
            <span className="position-absolute d-block"></span>
            <span className="position-absolute d-block"></span>
            Login
          </button>
          {!isValid && (
            <p className="error-message" style={{ color: "red" }}>
              The user is not valid. Please check your email and password.
            </p>
          )}
          <p className="signup">
            Don't have an account?{" "}
            <br />
            <Link to="/signup">
              <button className="signup-button">Sign up</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
