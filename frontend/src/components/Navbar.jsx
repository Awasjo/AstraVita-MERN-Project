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
        <div className="hidden md:flex space-x-2">
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/"
              className={`nav-link font-bold text-dark-blue block px-4 py-2 ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/about"
              className={`nav-link font-bold text-dark-blue block px-4 py-2 ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              About Us
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/products"
              className={`nav-link font-bold text-dark-blue block px-4 py-2 ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              Products
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/contact"
              className={`nav-link font-bold text-dark-blue block px-4 py-2 ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden md:flex space-x-2">
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/login"
              className="nav-link font-bold text-dark-blue block px-4 py-2"
            >
              Log in
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/register"
              className="nav-link font-bold text-dark-blue block px-4 py-2"
            >
              Register
            </Link>
          </div>
        </div>
        <button 
          className="md:hidden flex items-center text-dark-blue hover:text-strong-blue transition-colors duration-300" 
          onClick={toggleMenu}
        >
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
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="flex flex-col py-2">
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/" 
                  ? "text-strong-blue" 
                  : "text-dark-blue"
                }`}
              >
                Home
              </Link>
            </div>
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/about"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/about"
                  ? "text-strong-blue"
                  : "text-dark-blue"
                }`}
              >
                About Us
              </Link>
            </div>
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/products"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/products"
                  ? "text-strong-blue"
                  : "text-dark-blue"
                }`}
              >
                Products
              </Link>
            </div>
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/contact"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/contact"
                  ? "text-strong-blue"
                  : "text-dark-blue"
                }`}
              >
                Contact
              </Link>
            </div>
            <div className="border-t border-gray-100 mt-2">
              <div className="hover:bg-light-theme transition-colors duration-300">
                <Link
                  to="/login"
                  className="block px-6 py-2 font-bold text-dark-blue"
                >
                  Log in
                </Link>
              </div>
              <div className="hover:bg-light-theme transition-colors duration-300">
                <Link
                  to="/register"
                  className="block px-6 py-2 font-bold text-dark-blue"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
