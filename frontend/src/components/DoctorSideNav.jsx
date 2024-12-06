import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorSideNav = ({doctor}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Common classes for consistent styling
  const navItemClass = "flex items-center space-x-6 px-8 py-4 hover:bg-[#282B59] transition-colors duration-200";
  const navTextClass = "font-inter text-base font-semibold text-[#D9DAE4]";
  const navIconClass = "w-4 h-4 brightness-0 invert";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const handleMyPations = () => {
    if (doctor) {
      navigate('/doctor', { state: { doctor: doctor } });
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleNotifications = () => {
    navigate('/doctor/notifications');
    setIsMobileMenuOpen(false);
  };

  const handleHomepage = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
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
          {/* My Patients - Active State */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-white" />
            <div className={`${navItemClass} bg-[#282B59]`} onClick={handleMyPations}>
              <img
                src="../public/external/iconmonstruser3112411-vi2f.svg"
                alt="My Patients"
                className={navIconClass}
              />
              <span className="font-inter text-base font-semibold text-white">My Patients</span>
            </div>
          </div>

          {/* Messages */}
          <div className={navItemClass}>
            <img
              src="../public/external/iconmonstrspeechbubble1912411-wfu.svg"
              alt="Messages"
              className={navIconClass}
            />
            <span className={navTextClass}>Messages</span>
          </div>

          {/* Notifications */}
          <div className={navItemClass} onClick={handleNotifications}>
            <img
              src="../public/external/iconmonstrbell2411.svg"
              alt="Notifications"
              className={navIconClass}
            />
            <span className={navTextClass}>Notifications</span>
          </div>

          {/* Settings */}
          <div className={navItemClass}>
            <img
              src="../public/external/iconmonstrgear112411-zavc.svg"
              alt="Settings"
              className={navIconClass}
            />
            <span className={navTextClass}>Settings</span>
          </div>

          {/* Bottom Navigation Items */}
          <div className="mt-auto mb-8">
            {/* Homepage */}
            <div className={navItemClass} onClick={handleHomepage}>
              <img
                src="../public/external/iconmonstrhome112411-26ww.svg"
                alt="Homepage"
                className={navIconClass}
              />
              <span className={navTextClass}>Homepage</span>
            </div>

            {/* Logout */}
            <div className={navItemClass} onClick={handleLogout}>
              <img
                src="../public/external/iconmonstrlogout1812411-gevq.svg"
                alt="Logout"
                className={navIconClass}
              />
              <span className={navTextClass}>Log Out</span>
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

export default DoctorSideNav;