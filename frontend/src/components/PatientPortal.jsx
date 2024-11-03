import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import './PatientPortal.css'


const PatientPortal = (props) => {
    const location = useLocation();
    const patient = location.state.patient;
    const [isExpanded, setIsExpanded] = useState(false);
    

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);  
    };

    const handleUploadTestResult = () => {
      // Add code to upload test result
    };
    

  return (
    <div className="patientPortal-container">
      <Helmet>
        <title>Patient Portal</title>
        <meta property="og:title" content="Patient Portal" />
      </Helmet>
      <div className="home-desktop-patient-portal-test-results">

    <div className={`home-test-result1 ${isExpanded ? 'expanded' : ''}`}  onClick={toggleExpand}>

        <div className="test-header">
          <div className="home-phenotype">
            <span className="patientPortal-text21">Ultrarapid Metabolizer</span>
            <span className="patientPortal-text22">Phenotype</span>
          </div>
          <div className="home-diplotype">
            <span className="home-text23">*17/*17</span>
            <span className="patientPortal-text24">Diplotype</span>
          </div>
          <div className="home-tested-gene">
            <span className="patientPortal-text25">CYP2D6</span>
            <span className="patientPortal-text26">Tested Gene</span>
          </div>
          <div className="home-test-date">
            <span className="patientPortal-text14">23/10/2024</span>
            <span className="patientPortal-text15">Test Date</span>
          </div>
          </div>

        

        <div className="test-content" >
          <div className="home-uploadedby">
            <span className="patientPortal-text10">Gregory House</span>
            <span className="home-text11">Uploaded by</span>
          </div>
          <div className="home-upload-date">
            <span className="patientPortal-text12">24/10/2024</span>
            <span className="home-text13">Upload Date</span>
          </div>        
          <img
            src="../public/external/divider1973-rc7m.svg"
            alt="Divider1973"
            className="home-divider"
          />
          <div className="home-codeine">
            <span className="home-text16">
              CYP2D6 *17 is associated with decreased metabolism of codeine in
              people with Anemia, Sickle Cell.
            </span>
            <span className="patientPortal-text17">Codeine</span>
          </div>
          <div className="home-debrisoquine">
            <span className="home-text18">
              CYP2D6 *17/*17 is associated with decreased metabolism of
              debrisoquine.
            </span>
            <span className="patientPortal-text19">Debrisoquine</span>
          </div>
          <span className="home-text20">Affected Medications</span>
        </div>
        
        </div>

        <div className="home-sort-options">
          <img
            src="../public/external/iconmonstrarrow6512112-lajk.svg"
            alt="iconmonstrarrow6512112"
            className="home-iconmonstrarrow651"
          />
          <span className="home-text27">Sort by Test Date</span>
        </div>
        <div className="home-search-bar">
          <input className="patientPortal-text28" placeholder='Filer test results by gene or medication'>
          </input>
          <img
            src="../public/external/iconmonstrmagnifier212081-8lkk.svg"
            alt="iconmonstrmagnifier212081"
            className="home-iconmonstrmagnifier21"
          />
        </div>
        <button className="home-upload-button" onClick={handleUploadTestResult}>
          <span className="home-text29">Upload Test</span>
          <img
            src="../public/external/iconmonstrupload1812081-46t.svg"
            alt="iconmonstrupload1812081"
            className="home-iconmonstrupload181"
          />
        </button>
        <span className="patientPortal-text30">{patient.username}'s' Results</span>

        
        </div>
      </div>
    
  )
}

export default PatientPortal;
