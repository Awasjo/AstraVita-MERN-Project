import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthContext } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        { username, password },
        { withCredentials: true } // Include credentials
      );
      
      console.log('Login response:', response);
      console.log('Response data:', response.data); // Check the full response data

      if (response.data.message === 'Login successful') {
        console.log('User data:', response.data.user); // Check the user data specifically
        // Ensure that response.data.user exists and has role defined
        if (response.data.user && response.data.user.role) {
          setUser(response.data.user); // Set user after confirming it exists

          if (response.data.user.role === 'Doctor') { 
            navigate('/doctor', { state: { doctor: response.data.user } });
          } else if (response.data.user.role === 'Patient') {
            navigate('/patient', { state: { patient: response.data.user } });
          }
        } else {
          console.error('User role is undefined in response:', response.data.user);
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };


  return (
    <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
