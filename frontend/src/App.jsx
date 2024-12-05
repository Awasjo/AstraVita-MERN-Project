import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Login from "./components/Login";
import Register from "./components/Register";
import DoctorPortal from "./components/DoctorPortal";
import PatientPortal from "./components/PatientPortal";
import Layout from "./components/Layout";
import AddDoctor from "./components/AddDoctor";
import PatientNotifications from "./components/PatientNotifications";
import Contact from "./components/Contact";
import DoctorNotifications from "./components/DoctorNotifications";
import { Home } from "./components/Home";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/doctor", "/patient"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/doctor/*"
          element={
            <Layout>
              <DoctorPortal />
            </Layout>
          }
        />{" "}
        {/* Doctor portal route */}
        <Route
          path="/doctor/notifications"
          element={
            <Layout>
              <DoctorNotifications />
            </Layout>
          }
        />{" "}
        {/* Doctor notifications route */}
        <Route
          path="/patient/*"
          element={
            <Layout>
              <PatientPortal />
            </Layout>
          }
        />{" "}
        {/* Patient portal route */}
        <Route
          path="/patient/notifications"
          element={
            <Layout>
              <PatientNotifications />
            </Layout>
          }
        />{" "}
        {/* Patient notifications route */}
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </>
  );
};

export default App;