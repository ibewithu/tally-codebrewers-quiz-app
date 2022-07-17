import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/auth/login" element={<Login />} />
          <Route exact path="/auth/register" element={<Register />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
