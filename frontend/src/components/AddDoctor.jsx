import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddDoctor({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/doctors');
                setDoctors(response.data);
            } catch (error) {
                toast.error('Error fetching doctors: ' + error.message);
            }
        };
        if (isOpen) {
            fetchDoctors();
        }
    }, [isOpen]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setSearchTerm(doctor.firstName + ' ' + doctor.lastName);
        setShowSuggestions(false);
    };

    const handleAddDoctor = async () => {
        if (selectedDoctor) {
            setIsLoading(true);
            try {
                await axios.post(
                    'http://localhost:3000/api/users/request-permission/' + selectedDoctor._id,
                    {},
                    { withCredentials: true }
                );
                toast.success(`Successfully sent request to Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}`);
                onClose();
            } catch (error) {
                toast.error('Error sending request: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (doctor.firstName && doctor.firstName.toLowerCase().includes(searchLower)) ||
            (doctor.lastName && doctor.lastName.toLowerCase().includes(searchLower)) ||
            (doctor.username && doctor.username.toLowerCase().includes(searchLower)) ||
            (doctor.email && doctor.email.toLowerCase().includes(searchLower))
        );
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
                <h2 className="text-xl font-bold text-[#30336B] mb-4">Search for Doctor</h2>
                
                <div className="relative mb-4">
                    <input 
                        type="text" 
                        placeholder="Search by name or username..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#30336B]"
                    />
                    
                    {showSuggestions && searchTerm && (
                        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-[200px] overflow-y-auto z-10">
                            {filteredDoctors.map(doctor => (
                                <li 
                                    key={doctor._id} 
                                    onClick={() => handleDoctorSelect(doctor)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                                        ${selectedDoctor?._id === doctor._id ? 'bg-[#30336B] text-white' : ''}`}
                                >
                                    <div>Dr. {doctor.firstName} {doctor.lastName}</div>
                                    <div className="text-sm text-gray-600">
                                        Username: {doctor.username}
                                    </div>
                                </li>
                            ))}
                            {filteredDoctors.length === 0 && (
                                <li className="px-4 py-2 text-gray-500">
                                    No doctors found
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {selectedDoctor && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-[#30336B] font-semibold">
                            Selected: Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                        </p>
                        <p className="text-gray-600 text-sm">
                            Username: {selectedDoctor.username}
                        </p>
                        <p className="text-gray-600 text-sm">
                            Email: {selectedDoctor.email}
                        </p>
                    </div>
                )}

                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleAddDoctor}
                        disabled={!selectedDoctor || isLoading}
                        className={`px-4 py-2 rounded-md text-white
                            ${!selectedDoctor || isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#30336B] hover:bg-[#282B59]'} 
                            transition-colors`}
                    >
                        {isLoading ? 'Sending Request...' : 'Send Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDoctor;
