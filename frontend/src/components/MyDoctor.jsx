import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserCard from './UserCard';
import AddUser from './AddUser';

const MyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();


  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/users/patients/doctors', 
        { withCredentials: true }
      );
      setDoctors(response.data || []);
      setFilteredDoctors(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch doctors: ' + (error.response?.data?.message || error.message));
      setDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${doctorId}`);
      navigate('/doctor-details', { state: { doctor: response.data } });
    } catch (error) {
      toast.error('Failed to fetch doctor details: ' + (error.response?.data?.message || error.message));
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
      doctor.email.toLowerCase().includes(value)
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
    <div className="min-h-screen bg-[#F0F2F5] p-6">
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
                key={doctor._id} 
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
            fetchDoctors();
          }}
        />
      </div>
    </div>
  );
};

export default MyDoctor;