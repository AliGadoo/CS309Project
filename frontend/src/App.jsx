import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import OrderPage from './components/OrderPage'; // استيراد صفحة Order

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log(currentUser.user);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route path="/signup" element={<Signup setUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setUser={setCurrentUser} />} />
          <Route path="/order" element={<OrderPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
