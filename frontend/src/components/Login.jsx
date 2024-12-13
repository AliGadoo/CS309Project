import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // استيراد useNavigate
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // لإنشاء وظيفة التنقل

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
        if (data) {
          localStorage.setItem("currentUser", JSON.stringify(data));
          setUser(data);
          // توجيه المستخدم إلى صفحة Order بعد تسجيل الدخول بنجاح
          navigate("/order");
        } else {
          console.error("Error: Response is empty or invalid.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}> {/* استخدام onSubmit بدلاً من onClick */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> {/* استخدام type="submit" */}
        
        <p className="signup">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
