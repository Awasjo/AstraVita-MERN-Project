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
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

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
              <PrivateRoute allowedRoles={['Doctor']}>
                <DoctorPortal />
              </PrivateRoute>
            </Layout>
          }
        />{" "}
        {/* Doctor portal route */}
        <Route
          path="/doctor/notifications"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Doctor']}>
                <DoctorNotifications />
              </PrivateRoute>
            </Layout>
          }
        />{" "}
        {/* Doctor notifications route */}
        <Route
          path="/patient/*"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient']}>
                <PatientPortal />
              </PrivateRoute>
            </Layout>
          }
        />{" "}
        {/* Patient portal route */}
        <Route
          path="/patient/notifications"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient']}>
                <PatientNotifications />
              </PrivateRoute>
            </Layout>
          }
        />{" "}
        {/* Patient notifications route */}
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;