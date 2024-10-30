import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { Helmet } from 'react-helmet'

import './doctorPortal.css'
import PatientCard from './PatientCard';


const DoctorPortal = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [showPatientSearchBar, setShowPatientSearchBar] = useState(false);
  const location = useLocation();
  const doctor = location.state.doctor;

  

  const handleAddPatientButton = () => { 
    setShowPatientSearchBar(!showPatientSearchBar);
  }

  const handleAddPatientRequest = () => {
    
  }

  /*Get logged in doctor data */
  useEffect(() => {
    const fetchApprovedPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/doctors/patients', { withCredentials: true });
        if (response.data) {
          setApprovedPatients(response.data);  // Update state with patient data
          console.log('Approved patients: ', approvedPatients);
        } else {
          setApprovedPatients([]);  // Ensure it's an array if data is missing
        }
      } catch (error) {
        console.error('Error fetching doctors patients:', error);
        setApprovedPatients([]);  // Ensure it's an array even on error
      }
    };

    fetchApprovedPatients();
  }, []);

  return (
    <div className="doctor-container">
      <Helmet>
        <title>Doctor Portal</title>
        <meta property="og:title" content="Doctor Portal" />
      </Helmet>

      <div className="home-desktop-doctor-portal-my-patients">

      {approvedPatients.map((patient) => (
        <PatientCard key={patient._id} patient={patient} />
      ))}
        
        <div className="home-sort-options">
          <img
            src="../public/external/iconmonstrarrow6512522-vjys.svg"
            alt="iconmonstrarrow6512522"
            className="home-iconmonstrarrow651"
          />
          <span className="doctor-text14">
            <span>Sort by First Name</span>
          </span>
        </div>
        <div className="home-search-bar">
          <span className="home-text16">
            <span>Filter patients by name</span>
          </span>
          <img
            src="../public/external/iconmonstrmagnifier212522-8zfn.svg"
            alt="iconmonstrmagnifier212522"
            className="home-iconmonstrmagnifier21"
          />
        </div>
        <button className="home-add-patient-button" onClick={handleAddPatientButton}>
          <span className="home-text18">
            <span>Add Patient</span>
          </span>
          <img
            src="..\public\external\iconmonstrplus212522-vrqd.svg"
            alt="iconmonstrplus212522"
            className="home-iconmonstrplus21"
          />
        </button>
        <span className="home-text20">
          <span>{doctor.username}'s Patients</span>
        </span>
        <div className="home-side-navbar">
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/7a6854e0-f76a-40d8-b80e-af5728e17881?org_if_sml=11716&amp;force_format=original"
            alt="PlaceholderLogo2411"
            className="home-placeholder-logo"
          />
          <div className="home-settings">
            <span className="doctor-text22">
              <span>Settings</span>
            </span>
            <img
              src="../public/external/iconmonstrgear112411-zavc.svg"
              alt="iconmonstrgear112411"
              className="home-iconmonstrgear11"
            />
          </div>
          <div className="home-messages">
            <span className="doctor-text24">
              <span>Messages</span>
            </span>
            <img
              src="../public/external/iconmonstrspeechbubble1912411-wfu.svg"
              alt="iconmonstrspeechbubble1912411"
              className="home-iconmonstrspeechbubble191"
            />
          </div>
          <div className="home-my-doctors">
            <span className="doctor-text26">
              <span>My Patients</span>
            </span>
            <img
              src="../public/external/iconmonstruser3112411-vi2f.svg"
              alt="iconmonstruser3112411"
              className="home-iconmonstruser311"
            />
            <img
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/2e1899c5-de3c-460f-90d6-695ea0897e45?org_if_sml=1141&amp;force_format=original"
              alt="Line2411"
              className="home-line"
            />
          </div>
          <div className="doctor-log-out">
            <span className="doctor-text28">
              <span>Log Out</span>
            </span>
            <img
              src="../public/external/iconmonstrlogout1812411-gevq.svg"
              alt="iconmonstrlogout1812411"
              className="home-iconmonstrlogout181"
            />
          </div>
          <div className="home-homepage">
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
      </div>

      {showPatientSearchBar && 
        <div className="home-patient-search-bar">
          <div className="home-search-bar1">
          <input
            type="text"
            className="patient-search-name"
            placeholder="First Name"
          />
          <input
            type="text"
            className="patient-search-name"
            placeholder="Last Name"
          />
        </div>
          <button className="submit-patient-search" onClick={handleAddPatientRequest}>
            <span className="patient-search-text">
              <span>Request Patient Permission</span>
            </span>
            <img
              src="../public/external/iconmonstrmagnifier212522-8zfn.svg"
              alt="iconmonstrmagnifier212522"
              className="patient-iconmonstrmagnifier21"
            />
          </button>
        </div>
      }
    </div>
  )
}

export default DoctorPortal;
