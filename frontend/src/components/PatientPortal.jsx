import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './PatientPortal.css';

const PatientPortal = (props) => {
    const location = useLocation();
    const patient = location.state.patient;
    const [expandedResults, setExpandedResults] = useState({});
    const [testResults, setTestResults] = useState([]);
    const fileInputRef = useRef(null);

    const fetchTestResults = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/api/test-results/patient/${patient.id}`, { withCredentials: true });
          setTestResults(response.data);
          console.log('testResults:', response.data);
      } catch (error) {
          console.error('Error fetching test results:', error);
      }
  };
    useEffect(() => {
        fetchTestResults();
    }, [patient.id]);

    const toggleExpand = (id) => {
        setExpandedResults(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const fileContents = e.target.result;
            const jsonData = JSON.parse(fileContents);
  
            // Send the parsed JSON data to the backend
            const response = await axios.post('http://localhost:3000/api/test-results', jsonData, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
  
            console.log('Data uploaded successfully:', response.data);
            // Optionally, fetch the updated test results
            fetchTestResults();
          } catch (error) {
            console.error('Error uploading data:', error);
          }
        };
        reader.readAsText(file);
      }
    };
  
    const handleUploadTestResult = () => {
      fileInputRef.current.click();
    };

  return (
    <div className="patientPortal-container">
      <Helmet>
        <title>Patient Portal</title>
        <meta property="og:title" content="Patient Portal" />
      </Helmet>
      <div className="home-desktop-patient-portal-test-results">
        {testResults.map((result) => (
          <div key={result._id} className={`home-test-result1 ${expandedResults[result._id] ? 'expanded' : ''}`} onClick={() => toggleExpand(result._id)}>
            <div className="test-header">
              <div className="home-phenotype">
                <span className="patientPortal-text21">{result.phenotype}</span>
                <span className="patientPortal-text22">Phenotype</span>
              </div>
              <div className="home-diplotype">
                <span className="home-text23">{result.diplotype}</span>
                <span className="patientPortal-text24">Diplotype</span>
              </div>
              <div className="home-tested-gene">
                <span className="patientPortal-text25">{result.testedGene.geneName}</span>
                <span className="patientPortal-text26">Tested Gene</span>
              </div>
              <div className="home-test-date">
                <span className="patientPortal-text14">{new Date(result.testDate).toLocaleDateString()}</span>
                <span className="patientPortal-text15">Test Date</span>
              </div>
            </div>
            <div className="test-content">
              <div className="home-uploadedby">
                <span className="patientPortal-text10">{result.uploadedBy.firstName} {result.uploadedBy.lastName}</span>
                <span className="home-text11">Uploaded by</span>
              </div>
              <div className="home-upload-date">
                <span className="patientPortal-text12">{new Date(result.uploadDate).toLocaleDateString()}</span>
                <span className="home-text13">Upload Date</span>
              </div>
              <img
                src="../public/external/divider1973-rc7m.svg"
                alt="Divider1973"
                className="home-divider"
              />
              {/* <div className="home-codeine">
                <span className="home-text16">
                  {result.testedGene.geneName} {result.maternalAlleleDisplayName}/{result.paternalAlleleDisplayName} is associated with {result.phenotype} metabolism of codeine.
                </span>
                <span className="patientPortal-text17">Codeine</span>
              </div> */}
                {result.affectedMedications.map((annotation, index) => (
                  <div key={index} className="home-debrisoquine">
                    <span className="home-text18">
                      {annotation.description}
                    </span>
                    {annotation.associatedDrug && (
                      <>
                        {/* <span className="patientPortal-text19">
                          {annotation.associatedDrug.drugName} 
                        </span> */}
                        <span className="patientPortal-text19">
                          {annotation.associatedDrug.description} 
                        </span>
                      </>
                    )}
                  </div>
                ))}
              {/* <div className="home-debrisoquine">
                <span className="home-text18">
                  {result.testedGene.geneName} {result.maternalAlleleDisplayName}/{result.paternalAlleleDisplayName} is associated with {result.phenotype} metabolism of debrisoquine.
                </span>
                <span className="patientPortal-text19">Debrisoquine</span>
              </div> */}
              <span className="home-text20">Affected Medications</span>
              <div className="home-affected-medications">

              </div>
            </div>
          </div>
        ))}
        <div className="home-sort-options">
          <img
            src="../public/external/iconmonstrarrow6512112-lajk.svg"
            alt="iconmonstrarrow6512112"
            className="home-iconmonstrarrow651"
          />
          <span className="home-text27">Sort by Test Date</span>
        </div>
        <div className="home-search-bar">
          <input className="patientPortal-text28" placeholder='Filter test results by gene or medication'>
          </input>
          <img
            src="../public/external/iconmonstrmagnifier212081-8lkk.svg"
            alt="iconmonstrmagnifier212081"
            className="home-iconmonstrmagnifier21"
          />
        </div>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="home-upload-button" onClick={handleUploadTestResult}>
          <span className="home-text29">Upload Test</span>
          <img
            src="../public/external/iconmonstrupload1812081-46t.svg"
            alt="iconmonstrupload1812081"
            className="home-iconmonstrupload181"
          />
        </button>
        <span className="patientPortal-text30">{patient.username}'s Results</span>
      </div>
    </div>
  )
}

export default PatientPortal;
