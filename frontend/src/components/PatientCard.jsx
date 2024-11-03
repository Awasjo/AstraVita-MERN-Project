// PatientCard.jsx
import React from 'react';

const PatientCard = ({ patient, onClick }) => {
  //console.log('Patient data:', patient);

  return (
    <div className="home-patient-card" onClick={() => onClick(patient.id)}>
      <div className="home-remove-button">
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/3d9fdc48-8a45-43f8-a69b-4ef474674836?org_if_sml=1805&amp;force_format=original"
          alt="Ellipse"
          className="doctor-ellipse1"
        />
        <img
          src="/external/iconmonstrxmark912522-0v6q.svg"
          alt="Remove"
          className="home-iconmonstrxmark91"
        />
      </div>
      <div className="home-message-button">
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/57d3ea6f-9e29-4c20-92a7-8c61aa58e593?org_if_sml=1805&amp;force_format=original"
          alt="Message"
          className="doctor-ellipse2"
        />
        <img
          src="/external/iconmonstrspeechbubble1922522-dzz4.svg"
          alt="Message Icon"
          className="home-iconmonstrspeechbubble192"
        />
      </div>
      <div className="home-test-results-button">
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/803af295-2a92-4b4a-bea5-48df09d65134?org_if_sml=1805&amp;force_format=original"
          alt="Test Results"
          className="doctor-ellipse3"
        />
        <img
          src="/external/iconmonstrclipboard122522-7uj8.svg"
          alt="Test Results Icon"
          className="home-iconmonstrclipboard12"
        />
      </div>
      <span className="patientCard-text10">
        <span>@{patient.username}</span>
      </span>
      <span className="patientCard-text12">
        <span>{patient.firstName} {patient.lastName}</span>
      </span>
      <img
        src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/d9334bea-dc97-4f8a-a689-99c3fee50b9b/36e4b167-df3d-43ef-b848-7805ba251127?org_if_sml=11663&amp;force_format=original"
        alt="Profile"
        className="home-profile-picture"
      />
    </div>
  );
};

export default PatientCard;
