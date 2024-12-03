import './PatientPortal.css'; // Import the stylesheet
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PatientSideNav = (props) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/api/users/logout');
      if (response.data.message === 'Logout successful') {
        alert('Logout successful!');
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
    navigate('/patient/notifications', { state: { patient: props.patient } });
  }

  const handleHomepage = () => {
    navigate('/');
  };

  return (
    <div className="home-side-navbar">
      <img
        src="../public/external/placeholderlogo1805-9za8-200h.png"
        alt="PlaceholderLogo1805"
        className="home-placeholder-logo"
      />
      <div className="home-test-results">
        <span className="patientPortal-text34">Test Results</span>
        <img
          src="../public/external/iconmonstrclipboard112192-hxc9.svg"
          alt="iconmonstrclipboard112192"
          className="home-iconmonstrclipboard11"
        />
      </div>
      <div className="home-my-doctors">
        <span className="home-text33">My Doctors</span>
        <img
          src="../public/external/iconmonstruser3112193-o16o.svg"
          alt="iconmonstruser3112193"
          className="home-iconmonstruser311"
        />
      </div>
      <div className="patient-messages">
        <span className="patientPortal-text32">Messages</span>
        <img
          src="../public/external/iconmonstrspeechbubble1912234-e9s.svg"
          alt="iconmonstrspeechbubble1912234"
          className="home-iconmonstrspeechbubble191"
        />
      </div>
      <div className="home-settings">
        <span className="home-text31">Settings</span>
        <img
          src="../public/external/iconmonstrgear112234-1lyt.svg"
          alt="iconmonstrgear112234"
          className="home-iconmonstrgear11"
        />
      </div>
      <div className="patient-notifications" onClick={handleNotifications}>
        <span className="patientPortal-text32">Notifications</span>
        <img
          src="../public/external/iconmonstrbell2411.png"
          alt="iconmonstrbell2411"
          className="patient-iconmonstrbell"
        />
      </div>
      <div className="home-sign-out" onClick={handleLogout}>
        <span className="home-text35">Sign Out</span>
        <img
          src="../public/external/iconmonstrlogout1812213-0hv9.svg"
          alt="iconmonstrlogout1812213"
          className="home-iconmonstrlogout181"
        />
      </div>
      <div className="home-homepage" onClick={handleHomepage}>
        <span className="patientPortal-text36">Homepage</span>
        <img
          src="../public/external/iconmonstrhome112223-3zd.svg"
          alt="iconmonstrhome112223"
          className="home-iconmonstrhome11"
        />
      </div>
    </div>
  );
};

export default PatientSideNav;
