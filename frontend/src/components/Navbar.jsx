import React, { useState, useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo from "/external/logo-placeholder-primary.png";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="OneDrug logo" className="h-8 w-auto mt-1" />
        </Link>
        <div className="hidden lg:flex space-x-8 font-semibold">
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/"
              className={`nav-link text-dark-blue block px-4 py-2 ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/about-us"
              className={`nav-link text-dark-blue block px-4 py-2 ${
                location.pathname === "/about-us" ? "active" : ""
              }`}
            >
              About Us
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/products"
              className={`nav-link text-dark-blue block px-4 py-2 ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              Products
            </Link>
          </div>
          <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
            <Link
              to="/contact"
              className={`nav-link text-dark-blue block px-4 py-2 ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex space-x-4">
        {user ? (
            <>
              <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
                <Link
                  to={user.role === "Patient" ? "/patient" : "/doctor"}
                  state={user.role === "Patient" ? {patient:user} : {doctor:user}}
                  className="nav-link filled-button"
                >
                  Dashboard
                </Link>
              </div>
              <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
                <button
                  onClick={handleLogout}
                  className="nav-link outlined-button"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
                <Link
                  to="/login"
                  className="nav-link filled-button"
                >
                  Log in
                </Link>
              </div>
              <div className="hover:bg-light-theme rounded-md transition-colors duration-300">
                <Link
                  to="/register"
                  className="nav-link outlined-button"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
        <button 
          className="lg:hidden flex items-center text-dark-blue hover:text-strong-blue transition-colors duration-300" 
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
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="flex flex-col py-2">
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/" 
                  ? "text-light-blue" 
                  : "text-dark-blue"
                }`}
              >
                Home
              </Link>
            </div>
            <div className="hover:bg-light-theme transition-colors duration-300">
              <Link
                to="/about-us"
                className={`block px-6 py-2 font-bold ${
                  location.pathname === "/about-us"
                  ? "text-light-blue"
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
                  ? "text-light-blue"
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
                  ? "text-light-blue"
                  : "text-dark-blue"
                }`}
              >
                Contact
              </Link>
            </div>
            <div className="border-t border-gray-100 mt-2">
            {user ? (
                <>
                  <div className="hover:bg-light-theme transition-colors duration-300">
                  <Link
                  to={user.role === "Patient" ? "/patient" : "/doctor"}
                  state={user.role === "Patient" ? {patient:user} : {doctor:user}}
                  className="block px-6 py-2 font-bold text-dark-blue"
                >
                  Dashboard
                </Link>
                  </div>
                  <div className="hover:bg-light-theme transition-colors duration-300">
                    <button
                      onClick={handleLogout}
                      className="block px-6 py-2 font-bold text-dark-blue"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
