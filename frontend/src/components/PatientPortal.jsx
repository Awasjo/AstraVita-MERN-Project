import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const PatientPortal = () => {
  const location = useLocation();
  const patient = location.state.patient;
  const testResultId = location.state.testResultId;

  var patientId = patient._id || patient.id;
  const [expandedResults, setExpandedResults] = useState({});
  const [testResults, setTestResults] = useState([]);
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(testResultId ?? "");
  const [filteredResults, setFilteredResults] = useState([]);

  const fetchTestResults = async (patientId) => {
    setTestResults([]); // Clear current state
    try {
      const response = await axios.get(
        `http://localhost:3000/api/test-results/patient/${patientId}`,
        { withCredentials: true }
      );
      setTestResults(response.data);
      console.log("testResults:", response.data);
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  };

  useEffect(() => {
    fetchTestResults(patientId);
  }, [patientId]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults(testResults);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = testResults.filter(result => {
      // Search in test ID
      const idMatch = result._id.toLowerCase().includes(query);
      
      // Search in gene name
      const geneMatch = result.testedGene.geneName.toLowerCase().includes(query);
      
      // Search in affected medications
      const medicationMatch = result.affectedMedications.some(annotation => 
        annotation.associatedDrug && 
        annotation.associatedDrug.drugName.toLowerCase().includes(query)
      );

      return idMatch || geneMatch || medicationMatch;
    });

    setFilteredResults(filtered);
  }, [searchQuery, testResults]);

  const toggleExpand = (id) => {
    setExpandedResults((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const fileContents = e.target.result;
          
          // The older mock datasets also contain a patientId property - ignore it
          const rawJson = JSON.parse(fileContents);
          const jsonData = {
            patientId: patientId,
            testedGene: rawJson.testedGene,
            maternalAllele: rawJson.maternalAllele,
            paternalAllele: rawJson.paternalAllele,
            testDate: rawJson.testDate
          }

          const response = await axios.post(
            "http://localhost:3000/api/test-results",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          
          console.log("Data uploaded successfully:", response.data);
          fetchTestResults(patientId);
        } catch (error) {
          console.error("Error uploading data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadTestResult = () => {
    fileInputRef.current.click();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Patient Portal</title>
        <meta property="og:title" content="Patient Portal" />
      </Helmet>
      <div>
        <div>
          <input
            placeholder="Filter by test ID, gene, or medication"
            value={searchQuery}
            onChange={handleSearch}
          />
          <img
            src="../public/external/iconmonstrmagnifier212081-8lkk.svg"
            alt="iconmonstrmagnifier212081"
          />
        </div>
        
        <div>
          Tip: You can search by test ID, gene name, or medication name
        </div>
        
        {filteredResults.map((result) => (
          <div
            key={result._id}
            className={`home-test-result1 ${
              expandedResults[result._id] ? "expanded" : ""
            }`}
            onClick={() => toggleExpand(result._id)}
          >
            <div>
              <div>
                <span>{result.phenotype}</span>
                <span>Phenotype</span>
              </div>
              <div>
                <span>{result.diplotype}</span>
                <span>Diplotype</span>
              </div>
              <div>
                <span>
                  {result.testedGene.geneName}
                </span>
                <span>Tested Gene</span>
              </div>
              <div>
                <span>
                  {new Date(result.testDate).toLocaleDateString()}
                </span>
                <span>Test Date</span>
              </div>
            </div>
            <div>
              <div>
                <span>
                  {result.uploadedBy.firstName} {result.uploadedBy.lastName}
                </span>
                <span>Uploaded by</span>
              </div>
              <div>
                <span>
                  {new Date(result.uploadDate).toLocaleDateString()}
                </span>
                <span>Upload Date</span>
              </div>
              <img
                src="../public/external/divider1973-rc7m.svg"
                alt="Divider1973"
              />
              {result.affectedMedications.map((annotation, index) => (
                <div key={index} > 
                  {annotation.associatedDrug && (
                    <span>
                      {annotation.associatedDrug.drugName}
                    </span>
                  )}
                  <span>{annotation.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && searchQuery && (
          <div>
            No test results found matching "{searchQuery}"
          </div>
        )}

        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button onClick={handleUploadTestResult}>
          <span>Upload Test</span>
          <img
            src="../public/external/iconmonstrupload1812081-46t.svg"
            alt="iconmonstrupload1812081"
          />
        </button>
        <span>
          {patient.firstName} {patient.lastName}'s Results
        </span> 
      </div>
    </div>
  );
};

export default PatientPortal;