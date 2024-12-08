import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    fetch('http://localhost:5000/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("currentUser", JSON.stringify(data));
          setUser(data);
          navigate('/');
        } else {
          console.error("Error: Response is empty or invalid.");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
      });
  };
  

  return (
    <div className="sign-up-container">
      <h2>Signup</h2>
      <form>
        <label>Name</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button onClick={handleSignup}>Signup</button>
          <Link to="/login"><p>already have account</p></Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
