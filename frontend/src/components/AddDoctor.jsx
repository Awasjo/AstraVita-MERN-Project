import React, { useState } from 'react';
function AddDoctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors] = useState([
        { id: 1, name: 'Dr. John Smith' },
        { id: 2, name: 'Dr. Jane Doe' },
        { id: 3, name: 'Dr. Emily Johnson' },
        { id: 4, name: 'Dr. Michael Brown' },
        { id: 5, name: 'Dr. Sarah Davis' },
    ]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setSearchTerm(doctor.name);
        setShowSuggestions(false); // Hide suggestions after selection
    };

    const handleAddDoctor = () => {
        // Logic to add the selected doctor
    };

    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                                {doctor.name}
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
                    Selected Doctor: {selectedDoctor.name}
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
        </div>
    );
}

export default AddDoctor;
