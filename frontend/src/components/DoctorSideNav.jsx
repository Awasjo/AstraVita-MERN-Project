import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  './DoctorPortal.css';

const DoctorSideNav = () => {
    const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/api/users/logout');
      console.log('Logout response:', response);
      if (response.data.message === 'Logout successful') {
        alert('Logout successful!');
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

  const handleHomepage = () => {
    navigate('/');
  };

    return (
        
        <div className="home-side-navbar">
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/7a6854e0-f76a-40d8-b80e-af5728e17881?org_if_sml=11716&amp;force_format=original"
            alt="PlaceholderLogo2411"
            className="home-placeholder-logo"
          />
          <div className="doctor-settings">
            <span className="doctor-text22">
              <span>Settings</span>
            </span>
            <img
              src="../public/external/iconmonstrgear112411-zavc.svg"
              alt="iconmonstrgear112411"
              className="home-iconmonstrgear11"
            />
          </div>
          <div className="doctor-messages">
            <span className="doctor-text24">
              <span>Messages</span>
            </span>
            <img
              src="../public/external/iconmonstrspeechbubble1912411-wfu.svg"
              alt="iconmonstrspeechbubble1912411"
              className="home-iconmonstrspeechbubble191"
            />
          </div>
          <div className="home-my-patients">
            <span className="doctor-text26">
              <span>My Patients</span>
            </span>
            <img
              src="../public/external/iconmonstruser3112411-vi2f.svg"
              alt="iconmonstruser3112411"
              className="doctor-iconmonstruser311"
            />
            <img
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/2e1899c5-de3c-460f-90d6-695ea0897e45?org_if_sml=1141&amp;force_format=original"
              alt="Line2411"
              className="doctor-line"
            />
          </div>
          <div className="doctor-log-out" onClick={handleLogout}>
            <span className="doctor-text28">
              <span>Log Out</span>
            </span>
            <img
              src="../public/external/iconmonstrlogout1812411-gevq.svg"
              alt="iconmonstrlogout1812411"
              className="home-iconmonstrlogout181"
            />
          </div>
          <div className="home-homepage" onClick={handleHomepage}>
            <span className="doctor-text30">
              <span>Homepage</span>
            </span>
            <img
              src="../public/external/iconmonstrhome112411-26ww.svg"
              alt="iconmonstrhome112411"
              className="home-iconmonstrhome11"
            />
          </div>
        </div>

    );
}

export default DoctorSideNav;