import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserCard from './UserCard';
import AddUser from './AddUser';
import { mockDoctors } from '../mockData';
import { AuthContext } from './AuthContext';

const MyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showDemoHint, setShowDemoHint] = useState(true);

  useEffect(() => {
    // In demo mode, filter doctors assigned to this patient
    setIsLoading(true);
    const patientDoctors = mockDoctors.filter(doctor => 
      user && user.doctors && user.doctors.includes(doctor.id || doctor._id)
    );
    setDoctors(patientDoctors);
    setFilteredDoctors(patientDoctors);
    setIsLoading(false);
  }, [user]);

  const handleDoctorDetails = (doctorId) => {
    const doctor = mockDoctors.find(d => d.id === doctorId || d._id === doctorId);
    if (doctor) {
      navigate('/doctor-details', { state: { doctor: doctor } });
    } else {
      toast.error("Doctor not found in demo data");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    
    if (!value.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(doctor => 
      doctor.firstName.toLowerCase().includes(value) || 
      doctor.lastName.toLowerCase().includes(value) ||
      doctor.username.toLowerCase().includes(value) ||
      (doctor.email && doctor.email.toLowerCase().includes(value)) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(value))
    );

    setFilteredDoctors(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredDoctors].sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      
      const comparison = nameA.localeCompare(nameB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredDoctors(sorted);
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
                  <span className="font-bold">DEMO MODE:</span> This page shows your doctors from sample data.
                </p>
                <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                  <li>Click on a doctor to view their profile</li>
                  <li>In demo mode, added doctors will only persist for this session</li>
                  <li>"Add Doctor" will simulate adding a new doctor relationship</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#30336B] mb-4 md:mb-0">My Doctors</h1>
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
              <span className='font-semibold'>Add Doctor</span>
            </button>
          </div>

          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Filter doctors by name, username, or email"
              value={searchQuery}
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
            <div className="text-center py-8">Loading doctors...</div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid gap-4">
              {filteredDoctors.map((doctor) => (
                <UserCard 
                  key={doctor._id || doctor.id} 
                  user={doctor} 
                  onTestResultClick={handleDoctorDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No doctors found. Add a doctor to get started.
            </div>
          )}

          <AddUser
            isOpen={searchModalOpen}
            onClose={() => {
              setSearchModalOpen(false);
              // Simulate adding a doctor in demo mode
              const unassignedDoctor = mockDoctors.find(d => 
                !user.doctors.includes(d.id || d._id)
              );
              if (unassignedDoctor) {
                toast.success(`Added Dr. ${unassignedDoctor.firstName} ${unassignedDoctor.lastName} to your doctors in demo mode.`);
                // Add this doctor to the patient's doctors for this session
                setDoctors(prev => [...prev, unassignedDoctor]);
                setFilteredDoctors(prev => [...prev, unassignedDoctor]);
                
                // Update user's doctors list
                const updatedUser = {...user};
                updatedUser.doctors = [...updatedUser.doctors, unassignedDoctor.id || unassignedDoctor._id];
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDoctor;