import React, { useEffect } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import DoctorPortal from "./components/DoctorPortal";
import PatientPortal from "./components/PatientPortal";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import Contact from "./components/Contact";
import { Home } from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import MyDoctor from "./components/MyDoctor";
import DoctorProfile from "./components/construction/DoctorProfile";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import Messages from "./components/Messages";
import Settings from "./components/construction/Settings";
import AddUser from "./components/AddUser";
import UnderConstruction from "./components/construction/UnderConstruction";
import DemoBanner from "./components/DemoBanner";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/doctor", "/patient"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Get device type for toast positioning
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <DemoBanner />
      {!shouldHideNavbar && <Navbar />}
      {/* Modified toast configuration for better mobile experience */}
      <ToastContainer
        position={isMobile ? "bottom-center" : "top-right"}
        autoClose={isMobile ? 3000 : 5000}
        hideProgressBar={isMobile}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={!isMobile}
        theme="light"
        className={isMobile ? "mt-14" : ""}
        style={isMobile ? {
          bottom: '20px',
          width: '90%',
          left: '5%',
          right: '5%',
        } : {}}
        toastClassName={isMobile ? "text-sm" : ""}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctor-details" element={<DoctorProfile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<UnderConstruction />} />
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
                <Notifications />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/doctor/messages"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Doctor']}>
                <Messages />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/patient/*"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient','Doctor']}>
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
                <Notifications />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route path="/add-doctor" element={<AddUser />} />
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
              <PrivateRoute allowedRoles={['Patient']}>
                <MyDoctor />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/patient/messages"
          element={
            <Layout>
              <PrivateRoute allowedRoles={['Patient']}>
                <Messages />
              </PrivateRoute>
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;