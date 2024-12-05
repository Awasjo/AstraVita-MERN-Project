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
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="ml-[200px] p-8"> {/* Container with sidebar offset */}
        {/* Search Section */}
        <div className="relative mb-6">
          <input
            placeholder="Filter by test ID, gene, or medication"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-12 py-3 bg-[#D9D9D9] rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src="../public/external/iconmonstrmagnifier212081-8lkk.svg"
            alt="Search"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
          />
          <p className="mt-2 text-sm text-gray-600 italic">
            Tip: You can search by test ID, gene name, or medication name
          </p>
        </div>

        {/* Upload Button */}
        <button 
          onClick={handleUploadTestResult}
          className="flex items-center gap-3 px-6 py-3 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors"
        >
          <img
            src="../public/external/iconmonstrupload1812081-46t.svg"
            alt="Upload"
            className="w-5 h-5 brightness-0 invert"
          />
          <span className="font-semibold">Upload Test</span>
        </button>

        {/* Test Results List */}
        {filteredResults.map((result) => (
          <div
            key={result._id}
            onClick={() => toggleExpand(result._id)}
            className={`
              bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer
              transition-all duration-300 ease-in-out
              hover:border-2 hover:border-[#171775] hover:border-opacity-35
              ${expandedResults[result._id] ? 'max-h-[500px]' : 'max-h-20'}
              overflow-hidden
            `}
          >
            <div className="grid grid-cols-3 gap-6">
              {/* Test Info */}
              <div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-800">Gene</span>
                  <p className="text-gray-600">{result.testedGene.geneName}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-800">Phenotype</span>
                  <p className="text-gray-600">{result.phenotype}</p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-800">Diplotype</span>
                  <p className="text-gray-600">{result.diplotype}</p>
                </div>
              </div>

              {/* Dates and Uploader Info */}
              <div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-800">Test Date</span>
                  <p className="text-gray-600">
                    {new Date(result.testDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-800">Uploaded by</span>
                  <p className="text-gray-600">
                    {result.uploadedBy.firstName} {result.uploadedBy.lastName}
                  </p>
                </div>
              </div>

              {/* Medications */}
              <div className="border-l pl-6">
                {result.affectedMedications.map((annotation, index) => (
                  <div 
                    key={index}
                    className="mb-4 p-4 bg-[#D9DAE4] rounded-md"
                  >
                    {annotation.associatedDrug && (
                      <p className="font-bold mb-2">{annotation.associatedDrug.drugName}</p>
                    )}
                    <p className="text-sm text-gray-700">{annotation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* No Results Message */}
        {filteredResults.length === 0 && searchQuery && (
          <div className="text-center p-6 bg-gray-100 rounded-lg text-gray-600">
            No test results found matching "{searchQuery}"
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PatientPortal;