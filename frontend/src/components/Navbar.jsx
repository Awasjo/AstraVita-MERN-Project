// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="home-top-navbar">
      <img
        alt="Background"
        src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/10117492-4e85-46ac-833a-a3dca704d08c?org_if_sml=13615&force_format=original"
        className="home-background"
      />
      <div className="home-login-button">
        <span className="home-text46">
        <Link to="/login">
          <span>Log In</span>
          </Link>
        </span>
      </div>
      <div className="home-register-button">
      <span className="home-text46">
        <Link to="/register">
          <span>Register</span>
          </Link>
      </span>
      </div>
      <span className="home-text48">
        <span>Contact</span>
      </span>
      <span className="home-text50">
        <span>Products</span>
      </span>
      <span className="home-text52">
        <span>About Us</span>
      </span>
      <img
        alt="Underline"
        src="/external/underline2837-mixq.svg"
        className="home-underline"
      />
      <Link to="/" className="home-text54">
        <span>Home</span>
      </Link>
      <img
        alt="Placeholder Logo"
        src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/55e55fee-aab2-4bd6-93ae-8d46157a65dd?org_if_sml=13364&force_format=original"
        className="home-placeholder-logo"
      />
    </div>
  );
};

export default Navbar;
