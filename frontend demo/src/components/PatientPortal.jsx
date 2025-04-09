import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { mockTestResults } from "../mockData";

const PatientPortal = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const patient = location.state?.patient || user;
  const testResultId = location.state?.testResultId;
  const patientId = patient._id || patient.id;
  const [testResults, setTestResults] = useState([]);
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(testResultId ?? "");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSortAscending, setSortAscending] = useState(true);
  const [showDemoHint, setShowDemoHint] = useState(true);

  useEffect(() => {
    // In demo mode, filter mock test results for this patient
    const patientTestResults = mockTestResults.filter(
      result => result.patientId === patientId
    );
    setTestResults(patientTestResults);
    setFilteredResults(sortByTestDate(patientTestResults));
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

  const handleDelete = async (testResultId) => {
    // In demo mode, just filter out the deleted result from local state
    setTestResults(prevResults => prevResults.filter(result => result._id !== testResultId));
    setFilteredResults(prevResults => prevResults.filter(result => result._id !== testResultId));
    toast.success("Test result deleted in demo mode.");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContents = e.target.result;
          const rawJson = JSON.parse(fileContents);
          
          // In demo mode, just create a new mock result
          const newTestResult = {
            _id: `test${Date.now()}`,
            patientId: patientId,
            testedGene: {
              geneName: rawJson.testedGene === "6726c8613431225e2084ffd3" ? "CYP2C9" : "CYP3A5",
              geneDescription: rawJson.testedGene === "6726c8613431225e2084ffd3" ? 
                "Cytochrome P450 Family 2 Subfamily C Member 9" : 
                "Cytochrome P450 Family 3 Subfamily A Member 5"
            },
            diplotype: "*1/*3",
            phenotype: "Intermediate Metabolizer",
            testDate: rawJson.testDate || new Date().toISOString(),
            uploadDate: new Date().toISOString(),
            uploadedBy: {
              firstName: user.role === "Doctor" ? user.firstName : "Self",
              lastName: user.role === "Doctor" ? user.lastName : "Upload"
            },
            affectedMedications: [
              {
                associatedDrug: {
                  drugName: rawJson.testedGene === "6726c8613431225e2084ffd3" ? "Warfarin" : "Tacrolimus"
                },
                description: rawJson.testedGene === "6726c8613431225e2084ffd3" ? 
                  "Patients with this genotype might require lower doses of warfarin. Close monitoring is recommended." :
                  "Standard dosing is appropriate for this genotype."
              }
            ]
          };
          
          // Add to both test results and filtered results
          setTestResults(prev => [...prev, newTestResult]);
          setFilteredResults(prev => sortByTestDate([...prev, newTestResult]));
          event.target.value = null;
          toast.success("Test result uploaded successfully in demo mode.");
        } catch (error) {
          console.error("Error processing file:", error);
          toast.error("Error processing file. Please try a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadTestResult = () => {
    toast.info("In this demo, you can upload the sample files from the assets folder.");
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
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      {showDemoHint && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 relative">
          <button 
            className="absolute top-2 right-2 text-blue-500"
            onClick={() => setShowDemoHint(false)}
          >
            ×
          </button>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-bold">DEMO MODE:</span> This page displays test results from static data. 
                You can try these features:
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-blue-700">
                <li>Filter results using the search bar</li>
                <li>Sort results by test date</li>
                <li>Upload sample test files from the src/assets folder</li>
                <li>Delete test results (changes persist only for this session)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">
          {/* Header Section with Title and Upload Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#30336B] mb-4 md:mb-0">
              {(user.role === 'Doctor') ? patient.firstName + ' ' + patient.lastName + '\'s Test Results': 'My Test Results'}
            </h1>

            <button 
              onClick={handleUploadTestResult}
              className="flex items-center gap-2 px-6 py-2 bg-[#30336B] text-white rounded-md 
            hover:bg-[#282B59] transition-colors"
            >
              <img
                src="/external/iconmonstrupload1812081-46t.svg"
                alt="Upload"
                className="w-5 h-5 brightness-0 invert"
              />
              <span className="font-semibold">Upload Test</span>
            </button>
          </div>

          {/* Search Bar Section */}
          <div className="mb-6 relative">
              <input
                placeholder="Filter test results by gene or medication"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-12 py-3 bg-white rounded-lg shadow-sm focus:outline-none 
            focus:ring-2 focus:ring-[#30336B]"
              />
              <img
                src="/external/iconmonstrmagnifier212081-8lkk.svg"
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              />
          </div>

          {/* Sort Options - Separate div aligned right */}
          <div className="flex justify-end mb-6">
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
          <div className="grid gap-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div key={result._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  {/* Main Content */}
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                    {/* Gene Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                      {result.affectedMedications.length > 0 ? (
                        result.affectedMedications.map((annotation, index) => (
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
                        ))) : (
                          <p className="text-[#222222] text-sm">No affected medications.</p>
                        )}
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
                        src="/external/iconmonstr-trash-can-27.svg"
                        alt="Delete"
                        className="w-4 h-4 brightness-0 invert"
                      />
                      <span className="text-sm font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">No test results found. Upload a test result to get started.</p>
                <button 
                  onClick={handleUploadTestResult}
                  className="mt-4 px-6 py-2 bg-[#30336B] text-white rounded-md hover:bg-[#282B59] transition-colors"
                >
                  Upload Test Result
                </button>
              </div>
            )}
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
  );
};

export default PatientPortal;