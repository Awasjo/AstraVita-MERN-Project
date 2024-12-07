import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import AddUser from './AddUser';
import { toast } from 'react-toastify';

const DoctorPortal = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [showPatientSearchBar, setShowPatientSearchBar] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const doctor = location.state.doctor;
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredPatients, setFilteredPatients] = useState([]);


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
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Title and Add Patient Button */}
          <h1 className="text-3xl font-bold text-[#30336B] mb-4 md:mb-0">{doctor.username}'s Patients</h1>
          <button 
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#30336B] text-white rounded-md 
              hover:bg-[#282B59] transition-colors"
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
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Filter patients by name, username, or email"
              value={filterValue}
              onChange={handleChange}
              className="w-full px-12 py-3 bg-white rounded-lg shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-[#30336B]"
            />
            <img
                src="/external/iconmonstrmagnifier212522-8zfn.svg"
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              />
          </div>

          {/* Sort Options */}
          <div className="flex justify-end mb-6">
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
            {isLoading ? (
              <div className="text-center py-8">Loading patients...</div>
            ) : filteredPatients.length > 0 ? (
              <div className="grid gap-4">
                {filteredPatients.map((patient) => (
                  <UserCard 
                    key={patient._id} 
                    user={patient} 
                    onTestResultClick={handleCardClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No patients found matching your search.
              </div>
            )}

            <AddUser
              isOpen={searchModalOpen}
              onClose={() => {
                setSearchModalOpen(false);
                fetchApprovedPatients();
              }}
              userType="patient"
            />
        </div>
      </div>
  );
};

export default DoctorPortal;
