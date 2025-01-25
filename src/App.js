import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider,useUser } from "./context/userContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
    </UserProvider>
  );
};

export default App;
