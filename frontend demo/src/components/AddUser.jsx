import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { mockDoctors, mockPatients } from '../mockData';

function AddUser({ isOpen, onClose, userType = null }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const searchRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // In demo mode, get users from mock data
            const targetRole = user?.role === 'Doctor' ? 'Patient' : 'Doctor';
            const mockUsers = targetRole === 'Patient' ? mockPatients : mockDoctors;
            
            // If we're a doctor, filter out patients we already have
            if (user?.role === 'Doctor' && user.patients) {
                setUsers(mockUsers.filter(p => !user.patients.includes(p.id || p._id)));
            } 
            // If we're a patient, filter out doctors we already have
            else if (user?.role === 'Patient' && user.doctors) {
                setUsers(mockUsers.filter(d => !user.doctors.includes(d.id || d._id)));
            } 
            // Otherwise, just return all users of the target role
            else {
                setUsers(mockUsers);
            }
        }
    }, [isOpen, user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchTerm(user.firstName + ' ' + user.lastName);
        setShowSuggestions(false);
        setSearchTerm('')
    };

    const handleRemoveUser = () => {
        setSelectedUser(null);
    };

    const handleAddUser = () => {
        if (selectedUser) {
            setIsLoading(true);
            
            // Simulate API call in demo mode
            setTimeout(() => {
                setIsLoading(false);
                toast.success(`Successfully sent request to ${selectedUser.role === 'Doctor' ? 'Dr. ' : ''}${selectedUser.firstName} ${selectedUser.lastName} in demo mode`);
                onClose();
            }, 1000);
        }
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (user.firstName && user.firstName.toLowerCase().includes(searchLower)) ||
            (user.lastName && user.lastName.toLowerCase().includes(searchLower)) ||
            (user.username && user.username.toLowerCase().includes(searchLower)) ||
            (user.email && user.email.toLowerCase().includes(searchLower))
        );
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
                <h2 className="text-xl font-bold text-[#30336B] mb-4">Search for {user?.role === 'Doctor' ? 'Patients' : 'Doctors'}</h2>
                
                <div className="bg-blue-100 border-l-4 border-blue-500 p-3 mb-4 text-sm">
                    <p className="text-blue-800">
                        <span className="font-bold">DEMO MODE:</span> Search for users from the sample data.
                    </p>
                </div>
                
                <div className="relative mb-4" ref={searchRef}>
                    <input 
                        type="text" 
                        placeholder="Search by name or username..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#30336B]"
                    />
                    
                    {showSuggestions && (
                        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-[200px] overflow-y-auto z-10">
                            {filteredUsers.map(user => (
                                <li 
                                    key={user._id || user.id} 
                                    onMouseDown={() => handleUserSelect(user)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                                        ${selectedUser && (selectedUser._id === user._id || selectedUser.id === user.id) ? 'bg-[#30336B] text-white' : ''}`}
                                >
                                    <div>{user.role === 'Doctor' ? 'Dr. ' : ''}{user.firstName} {user.lastName}</div>
                                    <div className="text-sm text-gray-600">
                                        Username: {user.username}
                                    </div>
                                </li>
                            ))}
                            {filteredUsers.length === 0 && (
                                <li className="px-4 py-2 text-gray-500">
                                    No {user?.role === 'Doctor' ? 'patients' : 'doctors'} found
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {selectedUser && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md flex justify-between items-center">
                        <div>
                            <p className="text-[#30336B] font-semibold">
                                Selected: {selectedUser.role === 'Doctor' ? 'Dr. ' : ''}{selectedUser.firstName} {selectedUser.lastName}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Username: {selectedUser.username}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Email: {selectedUser.email}
                            </p>
                        </div>
                        <button 
                            onClick={handleRemoveUser}
                            className="text-red-600 hover:text-red-800 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
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
                        onClick={handleAddUser}
                        disabled={!selectedUser || isLoading}
                        className={`px-4 py-2 rounded-md text-white
                            ${!selectedUser || isLoading 
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

export default AddUser;
