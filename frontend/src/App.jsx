import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import OrderPage from "./components/OrderPage";
import UserProfile from "./components/UserProfile";
import SingleProductPage from "./components/SingleProductPage";
import AdminProfile from "./components/adminProfile";
import AddProduct from "./components/AddProduct";

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
            <Route path='/' element={<Home currentUser={currentUser} />} />
            <Route
              path="/signup"
              element={<Signup setUser={setCurrentUser} />}
            />
            <Route path="/login" element={<Login setUser={setCurrentUser} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route
              path="/userProfile"
              element={
                <UserProfile
                  currentUser={currentUser}
                  setUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<SingleProductPage currentUser={currentUser} />}
            />
            <Route path="/adminProfile" element={<AdminProfile currentUser={currentUser} />}/>
            <Route path="/addProduct" element={<AddProduct currentUser={currentUser}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
