import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { UserProvider,useUser } from "./context/userContext";

import Home from "./routes/Home";
import About from "./routes/About";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./routes/Register";
import Login from "./routes/Login";
import PetDetails from "./routes/PetDetails";
import SearchAndList from "./routes/SearchAndList";
import Profile from "./routes/Profile";
import PetForm from "./components/pages/profile/PetForm";
import AdminPanle from "./routes/AdminPanle";

// Protected Route component
const ProtectedRoute = ({ element, redirectTo }) => {
  const { user, loading } = useUser(); // Get the user and loading state from context

  if (loading) {
    return <div>Loading...</div>;  // Show a loading spinner or placeholder while loading
  }

  if (!user) {
    return <Navigate to={redirectTo} />; // Redirect to login if not authenticated
  }

  return element; // Render the protected route if user exists
};


// AdminProtectedRoute component
const AdminProtectedRoute = ({ element, redirectTo }) => {
  const { user, loading } = useUser(); // Get the user and loading state from context

  if (loading) {
    return <div>Loading...</div>;  // Show a loading spinner or placeholder while loading
  }

  if (!user || !user.isAdmin) {
    return <Navigate to={redirectTo} />; // Redirect to login if user is not an admin
  }

  return element; // Render the protected route if user is an admin
};

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pet-details/:id" element={<PetDetails />} />
        <Route path="/animals-list" element={<SearchAndList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/pet-form" element={<PetForm />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
            path="/profile"
            element={
              <ProtectedRoute element={<Profile />} redirectTo="/login" />
            }
          />

          {/* Admin Route - Only accessible by admin users */}
          <Route
            path="/admin-panel"
            element={
              <AdminProtectedRoute element={<AdminPanle />} redirectTo="/login" />
            }
          />

      </Routes>
      <Footer/>
    </Router>
    </UserProvider>
  );
};

export default App;
