import React from 'react';
import './contact.css';

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:support@onedrug.com?subject=Inquiry';
    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>If you have any questions or need further assistance, please reach out to us via email.</p>
            <button 
                onClick={handleEmailClick} 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Send Email
            </button>
        </div>
    );
};

export default Contact;
