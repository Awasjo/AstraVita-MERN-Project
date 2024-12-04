import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import heroImage from '/external/hero-image-medicine.jpg';
import logo from '/external/placeholderlogo1805-9za8-200h.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        { username, password },
        { withCredentials: true }
      );
      
      if (response.data.message === 'Login successful') {
        if (response.data.user && response.data.user.role) {
          setUser(response.data.user);

          if (response.data.user.role === 'Doctor') { 
            navigate('/doctor', { state: { doctor: response.data.user } });
          } else if (response.data.user.role === 'Patient') {
            navigate('/patient', { state: { patient: response.data.user } });
          }
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div>
      <section style={{ backgroundImage: `url(${heroImage})` }}>
        <div>
          <h1>
            Start building your comprehensive genomic profile today.
          </h1>
          <p>
            Log in or create an account to view your OneDrug ProbeiT results
          </p>
        </div>
        <img src={logo} alt="OneDrug Logo" />
      </section>

      <div>
        <form  onSubmit={handleLogin}>
          <h2 >Log in to OneDrug</h2>
          
          <div >
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password">
              Forgot your password?
            </Link>
          </div>

          <div >
            <button type="submit">
              Log in
            </button>

            <Link to="/register" style={{ width: '100%' }}>
              <button type="button">
                Create an account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
