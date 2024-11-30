// Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '/external/logo-placeholder-primary.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="OneDrug" />
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About Us
          </Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
            Products
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </div>

        <div className="nav-auth">
          <Link to="/login" className="login-link">
            Log in
          </Link>
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
