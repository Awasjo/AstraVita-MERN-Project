
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import PatientCard from './PatientCard';

const DoctorPortal = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [showPatientSearchBar, setShowPatientSearchBar] = useState(false);
  const [patientSearchFirstName, setPatientSearchFirstName] = useState('');
  const [patientSearchLastName, setPatientSearchLastName] = useState('');
  const location = useLocation();
  const doctor = location.state.doctor;
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const [suggestedPatients, setSuggestedPatients] = useState(approvedPatients);

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
  const handleSuggestion = () => {
    const filteredPatients = approvedPatients.filter(patient => 
        patient.firstName.toLowerCase().includes(filterValue) || 
        patient.lastName.toLowerCase().includes(filterValue)
    );
    setSuggestedPatients(filteredPatients);
};
const handleChange = (e) => {
  setFilterValue(e.target.value.toLowerCase());
};
  return (
    <div >
      <Helmet>
        <title>Doctor Portal</title>
        <meta property="og:title" content="Doctor Portal" />
      </Helmet>
      <div >
      {approvedPatients.map((patient) => (
        <PatientCard key={patient._id} patient={patient} onClick={handleCardClick}/>
      ))}
        
        <div >
          <img
            src="../public/external/iconmonstrarrow6512522-vjys.svg"
            alt="iconmonstrarrow6512522"
          />
          <span >
            <span>Sort by First Name</span>
          </span>
        </div>
        <div >
            <input
                type="text"
                placeholder="Filter patients by name"
                value={filterValue}
                onChange={handleChange}
                onBlur={handleSuggestion} // Suggest on losing focus
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSuggestion(); // Suggest on Enter key
                    }
                }}
            />
            <div >
                {suggestedPatients.map((patient, index) => (
                    <div key={index} >
                        {patient.firstName} {patient.lastName}
                    </div>
                ))}
            </div>
          <img
            src="../public/external/iconmonstrmagnifier212522-8zfn.svg"
            alt="iconmonstrmagnifier212522"
          />
        </div>
        <button  onClick={handleAddPatientButton}>
          <span >
            <span>Add Patient</span>
          </span>
          <img
            src="..\public\external\iconmonstrplus212522-vrqd.svg"
            alt="iconmonstrplus212522"
          />
        </button>
        <span >
          <span>{doctor.username}'s Patients</span>
        </span>

        
        
      </div>
      {showPatientSearchBar && 
        <div >
          <div >
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setPatientSearchFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setPatientSearchLastName(e.target.value)}
          />
        </div>
          <button onClick={handleAddPatientRequest}>
            <span >
              <span>Request Patient Permission</span>
            </span>
            <img
              src="../public/external/iconmonstrmagnifier212522-8zfn.svg"
              alt="iconmonstrmagnifier212522"
            />
          </button>
        </div>
      }
    </div>
  )
}
export default DoctorPortal;
