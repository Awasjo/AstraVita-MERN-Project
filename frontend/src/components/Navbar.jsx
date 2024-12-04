import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/external/logo-placeholder-primary.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <div>
        <Link to="/" >
          <img src={logo} alt="OneDrug" />
        </Link>

        <div >
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

        <div >
          <Link to="/login">
            Log in
          </Link>
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
