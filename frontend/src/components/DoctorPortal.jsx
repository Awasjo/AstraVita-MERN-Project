
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import './doctorPortal.css'
import PatientCard from './PatientCard';

const DoctorPortal = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [showPatientSearchBar, setShowPatientSearchBar] = useState(false);
  const [patientSearchFirstName, setPatientSearchFirstName] = useState('');
  const [patientSearchLastName, setPatientSearchLastName] = useState('');
  const location = useLocation();
  const doctor = location.state.doctor;
  const navigate = useNavigate();
  
  const handleAddPatientButton = () => { 
    setShowPatientSearchBar(!showPatientSearchBar);
  }
  const fetchApprovedPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/doctors/patients', { withCredentials: true });
      if (response.data) {
        setApprovedPatients(response.data);  // Update state with patient data          
      } else {
        setApprovedPatients([]);  // Ensure it's an array if data is missing
      }
    } catch (error) {
      console.error('Error fetching doctors patients:', error);
      setApprovedPatients([]);  // Ensure it's an array even on error
    }
  };
  
  useEffect(() => {
    fetchApprovedPatients();
  }, []);

  const handleCardClick = async ( id ) => {
    console.log('patient id: ', id);
    const patient = await axios.get(`http://localhost:3000/api/users/${id}`);
    navigate('/patient', { state: { patient: patient.data } }); // Update state with patient data
  };
  
  
  const handleAddPatientRequest = async () => {
    console.log(`patient first name: ${patientSearchFirstName}, last name: ${patientSearchLastName}`);
    try {
      const response = await axios.get(`http://localhost:3000/api/users/doctors/patients/search?firstName=${patientSearchFirstName}&lastName=${patientSearchLastName}`, { withCredentials: true });
      if (response.data) {
        console.log(response.data);
        const permissionResponse = await axios.post('http://localhost:3000/api/users/handle-permission-request',
          {
            requesterId: response.data[0]._id, // <--- Use response instead of permissionResponse
            action: 'approve'
          }, 
          { withCredentials: true }
        );
        if (permissionResponse.data) {
          console.log(permissionResponse.data);
          fetchApprovedPatients();
        } else {
          console.log('Error adding patient to doctor')
        }
        
      } else {
        console.log('No patients found');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  /*Get logged in doctor data */
  
  return (
    <div className="doctor-container">
      <Helmet>
        <title>Doctor Portal</title>
        <meta property="og:title" content="Doctor Portal" />
      </Helmet>
      <div className="home-desktop-doctor-portal-my-patients">
      {approvedPatients.map((patient) => (
        <PatientCard key={patient._id} patient={patient} onClick={handleCardClick}/>
      ))}
        
        <div className="home-sort-options">
          <img
            src="../public/external/iconmonstrarrow6512522-vjys.svg"
            alt="iconmonstrarrow6512522"
            className="doctor-iconmonstrarrow651"
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
          <span className="doctor-text18">
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

        
        
      </div>
      {showPatientSearchBar && 
        <div className="home-patient-search-bar">
          <div className="home-search-bar1">
          <input
            type="text"
            className="patient-search-name"
            placeholder="First Name"
            onChange={(e) => setPatientSearchFirstName(e.target.value)}
          />
          <input
            type="text"
            className="patient-search-name"
            placeholder="Last Name"
            onChange={(e) => setPatientSearchLastName(e.target.value)}
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
