// Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="home-top-navbar">
        <img
          alt="OneDrug Logo"
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/55e55fee-aab2-4bd6-93ae-8d46157a65dd?org_if_sml=13364&force_format=original"
          className="home-placeholder-logo"
        />

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

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

        <div className="nav-buttons">
          <div className="home-login-button">
            <Link to="/login" className="nav-button-text">
              Log In
            </Link>
          </div>

          <div className="home-register-button">
            <Link to="/register" className="nav-button-text">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>
          About Us
        </Link>
        <Link to="/products" className="nav-link" onClick={toggleMobileMenu}>
          Products
        </Link>
        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>
          Contact
        </Link>
        <div className="nav-buttons">
          <div className="home-login-button">
            <Link to="/login" className="nav-button-text" onClick={toggleMobileMenu}>
              Log In
            </Link>
          </div>
          <div className="home-register-button">
            <Link to="/register" className="nav-button-text" onClick={toggleMobileMenu}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
