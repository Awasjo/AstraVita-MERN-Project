import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const TestResult = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const testResultId = location.state?.testResultId;  // Retrieve testResultId from navigation state

  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (testResultId) {
      const fetchTestResult = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/test-results/${testResultId}`);
          setTestResult(response.data);
        } catch (error) {
          console.error('Error fetching test result:', error);
        }
      };

      fetchTestResult();
    }
  }, [testResultId]);

  if (!testResult) {
    return <div>Loading test result...</div>;
  }

  return (
    <div className="testResult-container">
      <h2>Test Result for Patient {testResult.patientName}</h2>
      <p>Test Name: {testResult.testName}</p>
      <p>Result: {testResult.result}</p>
      <p>Date: {new Date(testResult.date).toLocaleDateString()}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default TestResult;
