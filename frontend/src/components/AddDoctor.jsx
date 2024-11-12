import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddDoctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch doctors from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

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
            try {
                // Send request to add doctor
                await axios.post('http://localhost:3000/api/request-permission/' + selectedDoctor.id);
                setSuccessMessage(`Successfully added ${selectedDoctor.firstName} ${selectedDoctor.lastName}`);
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error adding doctor:', error);
            }
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        (doctor.firstName + ' ' + doctor.lastName).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column'
        }}>
            <div style={{ position: 'relative', width: '200px' }}>
                <input 
                    type="text" 
                    placeholder="Search for a doctor..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    onFocus={() => setShowSuggestions(true)}
                    style={{
                        padding: '8px',
                        fontSize: '16px',
                        width: '100%',
                        marginBottom: '10px'
                    }}
                />
                {showSuggestions && searchTerm && (
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1,
                        maxHeight: '150px',
                        overflowY: 'auto'
                    }}>
                        {filteredDoctors.map(doctor => (
                            <li 
                                key={doctor.id} 
                                onClick={() => handleDoctorSelect(doctor)}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ddd',
                                    backgroundColor: selectedDoctor?.id === doctor.id ? '#007bff' : '',
                                    color: selectedDoctor?.id === doctor.id ? 'white' : ''
                                }}
                            >
                                {doctor.firstName} {doctor.lastName}
                            </li>
                        ))}
                        {filteredDoctors.length === 0 && (
                            <li style={{ padding: '8px', color: '#888' }}>
                                No results found
                            </li>
                        )}
                    </ul>
                )}
            </div>
            
            {selectedDoctor && (
                <div style={{ marginTop: '10px', fontSize: '16px', color: '#007bff' }}>
                    Selected Doctor: {selectedDoctor.firstName} {selectedDoctor.lastName}
                </div>
            )}

            <button 
                onClick={handleAddDoctor} 
                disabled={!selectedDoctor} 
                style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    cursor: selectedDoctor ? 'pointer' : 'not-allowed',
                    backgroundColor: selectedDoctor ? '#007bff' : '#ccc',
                    color: 'white',
                    border: 'none',
                    width: '200px',
                    marginTop: '10px'
                }}
            >
                Add Doctor
            </button>

            {successMessage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px 40px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontSize: '18px',
                        color: 'green',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                        {successMessage}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddDoctor;
