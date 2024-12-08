import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route 
            path="/signup" 
            element={<Signup setUser={setCurrentUser} />}
          />
          <Route element={<Login />} path="/login" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
