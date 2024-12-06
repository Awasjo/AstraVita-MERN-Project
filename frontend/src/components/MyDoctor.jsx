import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddDoctor from './AddDoctor';

const DoctorCard = ({ doctor, onCardClick }) => (
  <div 
    onClick={() => onCardClick(doctor._id)}
    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className="flex-grow">
        <h2 className="text-lg font-bold text-[#30336B]">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <div className="text-gray-600 mt-2">
          <p>Username: {doctor.username}</p>
          <p>Specialty: {doctor.specialty || 'General Practice'}</p>
          <p>Email: {doctor.email}</p>
        </div>
      </div>
      <div className="flex items-center">
        <img 
          src="/external/iconmonstrarrowright212522-vyqs.svg" 
          alt="View Details" 
          className="w-6 h-6 text-[#30336B]"
        />
      </div>
    </div>
  </div>
);

const MyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]); // Store all doctors
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Store filtered results
  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/users/patients/doctors', 
        { withCredentials: true }
      );
      setDoctors(response.data || []);
      setAllDoctors(doctors);
      setFilteredDoctors(doctors);
    } catch (error) {
      toast.error('Failed to fetch doctors: ' + (error.response?.data?.message || error.message));
      setDoctors([]);
      setAllDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);
/* Filter functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDoctors(allDoctors);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const filtered = allDoctors.filter(doctor => 
      doctor.firstName.toLowerCase().includes(searchLower) ||
      doctor.lastName.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      (doctor.username && doctor.username.toLowerCase().includes(searchLower))
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, allDoctors]);
  */
  const handleDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${doctorId}`);
      navigate('/doctor-details', { state: { doctor: response.data } });
    } catch (error) {
      toast.error('Failed to fetch doctor details: ' + (error.response?.data?.message || error.message));
    }
  };
/* Filter handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const searchLower = searchQuery.toLowerCase();
    return (
      doctor.firstName.toLowerCase().includes(searchLower) ||
      doctor.lastName.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      (doctor.username && doctor.username.toLowerCase().includes(searchLower))
    );
  });
  */
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
            <span>Add Doctor</span>
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search doctors by name, username, or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-12 py-3 bg-white rounded-lg shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-[#30336B]"
          />
          <img
            src="/external/iconmonstrmagnifier212522-8zfn.svg"
            alt="Search"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading doctors...</div>
        ) : doctors.length > 0 ? (
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <DoctorCard 
                key={doctor._id} 
                doctor={doctor} 
                onCardClick={handleDoctorDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No doctors found. Add a doctor to get started.
          </div>
        )}

        <AddDoctor
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