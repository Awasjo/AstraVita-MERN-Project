import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientPortal = () => {
  const location = useLocation();
  const patient = location.state.patient;
  const testResultId = location.state.testResultId;

  var patientId = patient._id || patient.id;
  const [testResults, setTestResults] = useState([]);
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(testResultId ?? "");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSortAscending, setSortAscending] = useState(true);

  const fetchTestResults = async (patientId) => {
    setTestResults([]); // Clear current state
    try {
      const response = await axios.get(
        `http://localhost:3000/api/test-results/patient/${patientId}`,
        { withCredentials: true }
      );
      const sortedResults = sortByTestDate(response.data);
      setTestResults(response.data);
      setFilteredResults(sortedResults);
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
      setFilteredResults(sortByTestDate(testResults));
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

    setFilteredResults(sortByTestDate(filtered));
  }, [searchQuery, testResults, isSortAscending]);

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
          var jsonData = {
            patientId: patientId,
            testedGene: rawJson.testedGene,
            maternalAllele: rawJson.maternalAllele,
            paternalAllele: rawJson.paternalAllele,
            testDate: rawJson.testDate,
            replace: false
          }
          
          postToApi(jsonData);
        } catch (error) {
          console.error("Error uploading data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const postToApi = async (jsonData) => {
    try {
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
      if (error.status === 409) {
        if (confirm("A test result for this gene already exists. Replace existing test?")) {
          jsonData.replace = true;
          postToApi(jsonData); // https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fegq7k2ewwwb91.png
          return;
        }
      }
      throw error; // Defer to parent catch block
    }
  }

  const handleUploadTestResult = () => {
    fileInputRef.current.click();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortByTestDate = (results) => {
    return [...results].sort((a, b) => {
      const dateA = new Date(a.testDate);
      const dateB = new Date(b.testDate);
      return isSortAscending ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortToggle = () => {
    setSortAscending(!isSortAscending);
    setFilteredResults(prevResults => sortByTestDate(prevResults));
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <div className="ml-0 md:ml-[80px] relative p-4 md:p-0">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Header Section with Title and Upload Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center 
            md:absolute md:left-[80px] md:right-[280px] md:top-[107px]"
          >
            <h1 className="text-[28px] font-bold text-[#30336B] font-inter leading-[34px]">
              My Test Results
            </h1>

            <button 
              onClick={handleUploadTestResult}
              className="mt-4 md:mt-0 w-full md:w-[160px] h-[40px] flex items-center justify-center 
                gap-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors"
            >
              <img
                src="../public/external/iconmonstrupload1812081-46t.svg"
                alt="Upload"
                className="w-5 h-5 brightness-0 invert"
              />
              <span className="font-semibold">Upload Test</span>
            </button>
          </div>

          {/* Search Bar Section */}
          <div className="md:absolute md:left-[80px] md:top-[188px] md:w-[1080px]">
            <div className="relative w-full">
              <input
                placeholder="Filter test results by gene or medication"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-[40px] px-12 bg-[#D9D9D9] rounded-md text-[#888888] 
                  placeholder-[#888888] focus:outline-none"
              />
              <img
                src="../public/external/iconmonstrmagnifier212081-8lkk.svg"
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>

          {/* Sort Options - Separate div aligned right */}
          <div className="flex justify-end md:absolute md:right-[280px] md:top-[240px]">
            <button 
              onClick={handleSortToggle}
              className="flex items-center gap-2 text-[#444444] hover:text-[#30336B] transition-colors"
            >
              <span className="font-semibold text-sm">Sort by Test Date</span>
              <img
                src="../external/iconmonstrarrow6512112-lajk.svg"
                alt="Sort"
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSortAscending ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
          </div>

          {/* Test Results List */}
          <div className="mt-8 space-y-6 md:absolute md:left-[80px] md:top-[280px] md:w-[1080px]">
            {filteredResults.map((result) => (
              <div key={result._id} className="flex flex-col md:flex-row">
                {/* Main Content */}
                <div className="flex-1 bg-white rounded-t-md md:rounded-l-md md:rounded-tr-none 
                  shadow-sm p-4 md:p-8"
                >
                  {/* Gene Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-x-16 mb-8">
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm mb-1">Tested Gene</h3>
                      <p className="text-[#222222] text-sm">{result.testedGene.geneName}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm mb-1">Diplotype</h3>
                      <p className="text-[#222222] text-sm">{result.diplotype}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm mb-1">Phenotype</h3>
                      <p className="text-[#222222] text-sm">{result.phenotype}</p>
                    </div>
                  </div>

                  {/* Middle Section - Affected Medications */}
                  <div>
                    <h3 className="font-semibold text-[#222222] text-sm mb-4">Affected Medications</h3>
                    <div className="space-y-4">
                      {result.affectedMedications.map((annotation, index) => (
                        <div 
                          key={index}
                          className="bg-[#D9DAE4] rounded-lg p-4 max-w-[800px]"
                        >
                          {annotation.associatedDrug && (
                            <p className="font-semibold text-[#222222] text-sm mb-2">
                              {annotation.associatedDrug.drugName}
                            </p>
                          )}
                          <p className="text-[#222222] text-sm">{annotation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side Panel */}
                <div className="w-full md:w-[200px] bg-white rounded-b-md md:rounded-r-md md:rounded-bl-none 
                  shadow-sm p-4 md:p-6 border-t md:border-l md:border-t-0 border-[#D9DAE4] flex flex-col"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm">Test Date</h3>
                      <p className="text-[#222222] text-sm">
                        {new Date(result.testDate).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm">Upload Date</h3>
                      <p className="text-[#222222] text-sm">
                        {new Date(result.uploadDate).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222] text-sm">Uploaded by</h3>
                      <p className="text-[#222222] text-sm">
                        {result.uploadedBy.firstName} {result.uploadedBy.lastName}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(result._id);
                    }}
                    className="flex items-center justify-center gap-2 w-full md:w-[100px] h-[40px] 
                      bg-[#C0392B] text-white rounded-md hover:bg-red-700 transition-colors mt-6"
                  >
                    <img
                      src="../public/external/iconmonstrtrash1812081-46t.svg"
                      alt="Delete"
                      className="w-4 h-4 brightness-0 invert"
                    />
                    <span className="text-sm font-semibold">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

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
    </div>
  );
};

export default PatientPortal;