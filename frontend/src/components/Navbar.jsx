import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/external/logo-placeholder-primary.png";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="OneDrug" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className={`nav-link ${
              location.pathname === "/products" ? "active" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="nav-link bg-dark-blue text-light-theme px-4 py-2 rounded-md"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="nav-link bg-white border border-dark-blue px-4 py-2 rounded-md"
          >
            Register
          </Link>
        </div>
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className={`block px-4 py-2 ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-4 py-2 ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className={`block px-4 py-2 ${
              location.pathname === "/products" ? "active" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to="/contact"
            className={`block px-4 py-2 ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
          <Link to="/login" className="block px-4 py-2">
            Log in
          </Link>
          <Link to="/register" className="block px-4 py-2">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
