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
    <div>
      <img
        src="../public/external/placeholderlogo1805-9za8-200h.png"
        alt="PlaceholderLogo1805"
      />
      <div>
        <span>Test Results</span>
        <img
          src="../public/external/iconmonstrclipboard112192-hxc9.svg"
          alt="iconmonstrclipboard112192"
        />
      </div>
      <div>
        <span>My Doctors</span>
        <img
          src="../public/external/iconmonstruser3112193-o16o.svg"
          alt="iconmonstruser3112193"
        />
      </div>
      <div>
        <span>Messages</span>
        <img
          src="../public/external/iconmonstrspeechbubble1912234-e9s.svg"
          alt="iconmonstrspeechbubble1912234"
        />
      </div>
      <div>
        <span>Settings</span>
        <img
          src="../public/external/iconmonstrgear112234-1lyt.svg"
          alt="iconmonstrgear112234"
        />
      </div>
      <div onClick={handleNotifications}>
        <span>Notifications</span>
        <img
          src="../public/external/iconmonstrbell2411.svg"
          alt="iconmonstrbell2411"        />
      </div>
      <div onClick={handleLogout}>
        <span>Sign Out</span>
        <img
          src="../public/external/iconmonstrlogout1812213-0hv9.svg"
          alt="iconmonstrlogout1812213"
        />
      </div>
      <div onClick={handleHomepage}>
        <span>Homepage</span>
        <img
          src="../public/external/iconmonstrhome112223-3zd.svg"
          alt="iconmonstrhome112223"
        />
      </div>
    </div>
  );
};

export default PatientSideNav;
