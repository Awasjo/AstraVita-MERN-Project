import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} /> {/* Placeholder for a dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
