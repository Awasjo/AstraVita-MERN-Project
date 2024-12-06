import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const PatientSideNav = ({patient}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/api/users/logout');
      if (response.data.message === 'Logout successful') {
        localStorage.removeItem('authToken');
        navigate('/');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
      alert('Logout failed: ' + error.response.data.message);
    }
  };

  const handleNotifications = () => {
    navigate('/patient/notifications', { state: { patient: patient } });
    setIsMobileMenuOpen(false);
  }

  const handleHomepage = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleTestResults = () => {
    if (patient) {
      navigate('/patient', { state: { patient: patient } });
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleMyDoctors = () => {
    navigate('/patient/my-doctors');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItemClass = "flex items-center space-x-6 px-8 py-4 hover:bg-[#282B59] transition-colors duration-200";
  const navTextClass = "font-inter text-base font-semibold text-[#D9DAE4]";
  const navIconClass = "w-4 h-4 brightness-0 invert";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#181A36]"
        onClick={toggleMobileMenu}
      >
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-[#181A36] flex flex-col
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:w-[200px]
        ${isMobileMenuOpen ? 'w-64 translate-x-0' : '-translate-x-full'}
        z-40
      `}>
        {/* Logo */}
        <div className="mt-10 mb-12 mx-auto">
          <img
            src="../public/external/placeholderlogo1805-9za8-200h.png"
            alt="PlaceholderLogo1805"
            className="w-[109px] h-6"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col">
          {/* Test Results */}
          <div 
            className="relative cursor-pointer"
            onClick={handleTestResults}
          >
            {isActive('/patient/portal') && (
              <div className="absolute left-0 top-0 w-1.5 h-full bg-white" />
            )}
            <div className={`${navItemClass} ${isActive('/patient/portal') ? 'bg-[#282B59]' : ''}`}>
              <img
                src="../public/external/iconmonstrclipboard112192-hxc9.svg"
                alt="Test Results"
                className={navIconClass}
              />
              <span className={`${navTextClass} ${isActive('/patient/portal') ? 'text-white' : ''}`}>
                Test Results
              </span>
            </div>
          </div>

          {/* My Doctors */}
          <div 
            className="relative cursor-pointer"
            onClick={handleMyDoctors}
          >
            {isActive('/patient/my-doctors') && (
              <div className="absolute left-0 top-0 w-1.5 h-full bg-white" />
            )}
            <div className={`${navItemClass} ${isActive('/patient/my-doctors') ? 'bg-[#282B59]' : ''}`}>
              <img
                src="../public/external/iconmonstruser3112193-o16o.svg"
                alt="My Doctors"
                className={navIconClass}
              />
              <span className={`${navTextClass} ${isActive('/patient/my-doctors') ? 'text-white' : ''}`}>
                My Doctors
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className={navItemClass}>
            <img
              src="../public/external/iconmonstrspeechbubble1912234-e9s.svg"
              alt="Messages"
              className={navIconClass}
            />
            <span className={navTextClass}>Messages</span>
          </div>

          {/* Notifications */}
          <div 
            className="relative cursor-pointer"
            onClick={handleNotifications}
          >
            {isActive('/patient/notifications') && (
              <div className="absolute left-0 top-0 w-1.5 h-full bg-white" />
            )}
            <div className={`${navItemClass} ${isActive('/patient/notifications') ? 'bg-[#282B59]' : ''}`}>
              <img
                src="../public/external/iconmonstrbell2411.svg"
                alt="Notifications"
                className={navIconClass}
              />
              <span className={`${navTextClass} ${isActive('/patient/notifications') ? 'text-white' : ''}`}>
                Notifications
              </span>
            </div>
          </div>

          {/* Settings */}
          <div className={navItemClass}>
            <img
              src="../public/external/iconmonstrgear112234-1lyt.svg"
              alt="Settings"
              className={navIconClass}
            />
            <span className={navTextClass}>Settings</span>
          </div>

          {/* Bottom Navigation Items */}
          <div className="mt-auto mb-8">
            {/* Homepage */}
            <div 
              className="relative cursor-pointer"
              onClick={handleHomepage}
            >
              {isActive('/') && (
                <div className="absolute left-0 top-0 w-1.5 h-full bg-white" />
              )}
              <div className={`${navItemClass} ${isActive('/') ? 'bg-[#282B59]' : ''}`}>
                <img
                  src="../public/external/iconmonstrhome112223-3zd.svg"
                  alt="Homepage"
                  className={navIconClass}
                />
                <span className={`${navTextClass} ${isActive('/') ? 'text-white' : ''}`}>
                  Homepage
                </span>
              </div>
            </div>

            {/* Sign Out */}
            <div className={navItemClass} onClick={handleLogout}>
              <img
                src="../public/external/iconmonstrlogout1812213-0hv9.svg"
                alt="Sign Out"
                className={navIconClass}
              />
              <span className={navTextClass}>Sign Out</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};
PatientSideNav.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PatientSideNav;
