import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/userContext";
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
import OrgPending from "./routes/OrgPending";
import OrganizationQuestionnaire from "./components/pages/profile/organization/OrganizationQuestionnaire";
import SearchAdopters from "./routes/SearchAdopters";
import MoreDetails from "./components/pages/adminPanel/moreDetails/MoreDetails";
import MessagesPage from "./components/pages/messages/MessagesPage";

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

// ORG APPROVED ROUTE
const OrgApprovedProtectedRoute = ({ element, redirectTo }) => {
  const { user, loading } = useUser(); // Get user and loading state from context

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder while loading
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect if no user is found
  }

  // console.log(user.role,'||',user.status);
  if (user.role === "Adopter") {
    return element; // Render the protected component if all checks pass
  }
  // Check if the user is an organization and approved
  if (user.role === "Organization" && user.status === "Approved") {
    return element; // Render the protected component if all checks pass
  }
  if (user.role === "Organization" && (user.status === "Apply" || user.status === "Rejected")) {
    return <Navigate to="/org-form" />;
  }
  return <Navigate to="/org-pending" />;
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

////////////////////////////////////////
//////////////// ROUTES ////////////////
////////////////////////////////////////

const App = () => {

  return (
    <UserProvider>
      <Router>
        {/* {window.location.pathname !== "/admin-panel" && <Nav />} */}
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pet-details/:id" element={<PetDetails />} />
          <Route path="/animals-list" element={<SearchAndList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/org-pending" element={<OrgPending />} />

          <Route
            path="/org-form"
            element={
              <ProtectedRoute element={<OrganizationQuestionnaire />} redirectTo="/login" />
            }
          />

          <Route path="/pet-form" element={<PetForm />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute element={
                <OrgApprovedProtectedRoute element={<Profile />} redirectTo="/pending" />
              } redirectTo="/login" />
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute element={
                <OrgApprovedProtectedRoute element={<MessagesPage />} redirectTo="/pending" />
              } redirectTo="/login" />
            }
          />

          <Route
            path="/search-adopters"
            element={
              <ProtectedRoute element={
                <OrgApprovedProtectedRoute element={<SearchAdopters />} redirectTo="/pending" />
              } redirectTo="/login" />
            }
          />


          {/* Admin Route - Only accessible by admin users */}
          <Route
            path="/admin-panel"
            element={
              <AdminProtectedRoute element={<AdminPanle />} redirectTo="/login" />
            }
          />

          <Route
            path="/admin-panel/more-details/:id"
            element={
              <AdminProtectedRoute element={<MoreDetails />} redirectTo="/login" />
            }
          />

        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
