import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from './components/Login';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Signup />} path="/signup"/>
          <Route element={<Login />} path="/login"/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
