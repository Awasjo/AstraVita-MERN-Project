import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import AddUser from './AddUser';
import { toast } from 'react-toastify';
import { mockPatients } from '../mockData';
import { AuthContext } from './AuthContext';

const DoctorPortal = () => {
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const doctor = location.state?.doctor || user;
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDemoHint, setShowDemoHint] = useState(true);

  useEffect(() => {
    // In demo mode, filter patients for this doctor from mockPatients
    setIsLoading(true);
    const doctorPatients = mockPatients.filter(patient => 
      doctor && patient.doctors && patient.doctors.includes(doctor.id || doctor._id)
    );
    setApprovedPatients(doctorPatients);
    setFilteredPatients(doctorPatients);
    setIsLoading(false);
  }, [doctor]);

  const handleCardClick = (id) => {
    const patient = mockPatients.find(p => p.id === id || p._id === id);
    if (patient) {
      navigate('/patient', { state: { patient: patient } });
    } else {
      toast.error("Patient not found in demo data");
    }
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
      patient.username.toLowerCase().includes(value) ||
      (patient.email && patient.email.toLowerCase().includes(value))
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
    <div className="h-full bg-[#F0F2F5] p-6">
      <div className="max-w-[1200px] mx-auto h-[calc(100vh-3rem)] md:h-[calc(100vh-3.5rem)] overflow-y-auto">
        {showDemoHint && (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 relative">
            <button 
              className="absolute top-2 right-2 text-blue-500"
              onClick={() => setShowDemoHint(false)}
            >
              ×
            </button>
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">DEMO MODE:</span> This page shows your patients from sample data.
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                  <li>Click on a patient to view their test results</li>
                  <li>In demo mode, added patients will only persist for this session</li>
                  <li>"Add Patient" will simulate adding a new patient relationship</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Title and Add Patient Button */}
          <h1 className="text-3xl font-bold text-[#30336B] mb-4 md:mb-0">{doctor.firstName} {doctor.lastName}'s Patients</h1>
          <button 
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors"
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
            className="w-full px-12 py-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#30336B]"
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
                key={patient._id || patient.id} 
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
            // Simulate adding a patient in demo mode
            const unassignedPatient = mockPatients.find(p => 
              !p.doctors.includes(doctor.id || doctor._id)
            );
            if (unassignedPatient) {
              toast.success(`Added ${unassignedPatient.firstName} ${unassignedPatient.lastName} to your patients in demo mode.`);
              // Add this patient to the doctor's patients for this session
              setApprovedPatients(prev => [...prev, unassignedPatient]);
              setFilteredPatients(prev => [...prev, unassignedPatient]);
            }
          }}
          userType="patient"
        />
      </div>
    </div>
  );
};

export default DoctorPortal;
