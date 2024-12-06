import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredPatients, setFilteredPatients] = useState([]);

  const handleAddPatientButton = () => { 
    setShowPatientSearchBar(!showPatientSearchBar);
  }
  const fetchApprovedPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/doctors/patients', { withCredentials: true });
      if (response.data) {
        setApprovedPatients(response.data);
        setFilteredPatients(response.data);
      } else {
        setApprovedPatients([]);
        setFilteredPatients([]);
      }
    } catch (error) {
      console.error('Error fetching doctors patients:', error);
      setApprovedPatients([]);
      setFilteredPatients([]);
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
    if (!filterValue.trim()) {
      setSuggestedPatients(approvedPatients);
      return;
    }

    const filtered = approvedPatients.filter(patient => 
      patient.firstName.toLowerCase().includes(filterValue) || 
      patient.lastName.toLowerCase().includes(filterValue)
    );

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      const comparison = nameA.localeCompare(nameB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setSuggestedPatients(sorted);
  };
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);
    
    if (!value.trim()) {
      setFilteredPatients(approvedPatients);
      return;
    }

    const filtered = approvedPatients.filter(patient => 
      patient.firstName.toLowerCase().includes(value) || 
      patient.lastName.toLowerCase().includes(value) ||
      patient.username.toLowerCase().includes(value)
    );

    setFilteredPatients(filtered);
  };
  const handleSort = () => {
    const sorted = [...filteredPatients].sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      
      const comparison = nameA.localeCompare(nameB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredPatients(sorted);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="ml-0 md:ml-[80px] relative p-4 md:p-0">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Title and Add Patient Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center 
            md:absolute md:left-[80px] md:right-[280px] md:top-[107px]"
          >
            <h1 className="text-[28px] font-bold text-[#30336B] font-inter leading-[34px]">
              {doctor.username}'s Patients
            </h1>

            <button 
              onClick={handleAddPatientButton}
              className="mt-4 md:mt-0 w-full md:w-[160px] h-[40px] flex items-center justify-center 
                gap-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors"
            >
              <img
                src="/external/iconmonstrplus212522-vrqd.svg"
                alt="Add"
                className="w-5 h-5 brightness-0 invert"
              />
              <span className="font-semibold">Add Patient</span>
            </button>
          </div>

          {/* Search Bar Section */}
          <div className="md:absolute md:left-[80px] md:top-[188px] md:w-[1080px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Filter patients by name or username"
                value={filterValue}
                onChange={handleChange}
                className="w-full h-[40px] px-12 bg-[#D9D9D9] rounded-md text-[#888888] 
                  placeholder-[#888888] focus:outline-none"
              />
              <img
                src="/external/iconmonstrmagnifier212522-8zfn.svg"
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-end md:absolute md:right-[280px] md:top-[240px]">
            <button 
              onClick={handleSort}
              className="flex items-center gap-2 text-[#444444] hover:text-[#30336B] transition-colors"
            >
              <span className="font-semibold text-sm">Sort by First Name</span>
              <img
                src="/external/iconmonstrarrow6512522-vjys.svg"
                alt="Sort"
                className={`w-4 h-4 transition-transform duration-200 ${
                  sortDirection === 'desc' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Patient List */}
          <div className="mt-8 space-y-6 md:absolute md:left-[80px] md:top-[280px] md:w-[1080px]">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard key={patient._id} patient={patient} onClick={handleCardClick}/>
              ))
            ) : (
              <div className="bg-white rounded-md p-6 text-center text-gray-500">
                No patients found matching your search.
              </div>
            )}
          </div>

          {/* Patient Search Modal */}
          {showPatientSearchBar && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] m-4">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setPatientSearchFirstName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#30336B]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setPatientSearchLastName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#30336B]"
                  />
                </div>
                <div className="mt-6 flex flex-col md:flex-row justify-end gap-4">
                  <button 
                    onClick={() => setShowPatientSearchBar(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 md:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPatientRequest}
                    className="px-4 py-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] 
                      transition-colors order-1 md:order-2"
                  >
                    Request Patient Permission
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
