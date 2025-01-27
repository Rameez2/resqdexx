import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider,useUser } from "./context/userContext";

import Home from "./routes/Home";
import About from "./routes/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./routes/Register";
import Login from "./routes/Login";
import PetDetails from "./routes/PetDetails";
import SearchAndList from "./routes/SearchAndList";

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/search-list" element={<SearchAndList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
    </UserProvider>
  );
};

export default App;
