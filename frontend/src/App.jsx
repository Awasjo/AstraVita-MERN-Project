import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
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
import MyDoctor from "./components/MyDoctor";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/doctor", "/patient"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        />
        <Route
          path="/doctor/notifications"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Doctor']}>
                <DoctorNotifications />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/patient/*"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient']}>
                <PatientPortal />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/patient/notifications"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient']}>
                <PatientNotifications />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="*" element={<NotFound />} />
        <Route 
          path="/patient/portal" 
          element={
            <Layout>
              <PrivateRoute>
                <PatientPortal />
              </PrivateRoute>
            </Layout>
          } 
        />
        <Route
          path="/patient/my-doctors"
          element={
            <Layout>
              <PrivateRoute>
                <MyDoctor />
              </PrivateRoute>
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;