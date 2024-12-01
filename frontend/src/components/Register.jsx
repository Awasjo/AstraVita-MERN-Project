import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import heroImage from '/external/hero-image-medicine.jpg';
import logo from '/external/placeholderlogo1805-9za8-200h.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('Patient');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/users/register', {
        username,
        firstName,
        lastName,
        email,
        password,
        role,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="register-page">
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1 className="hero-title">Start building your comprehensive genomic profile today.</h1>
          <p className="hero-subtitle">Create an account to access OneDrug ProbeiT results</p>
        </div>
        <img src={logo} alt="OneDrug Logo" className="hero-logo" />
      </section>

      <div className="register-form-container">
        <form onSubmit={handleSubmit} noValidate className="register-form">
          <h2 className="register-title">Create a OneDrug account</h2>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Choose a username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input"
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Confirm your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>
          <div className="terms-group">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>I have read and agreed to OneDrug's User Agreement and Privacy Policy</span>
            </label>
          </div>
          <div className="button-group">
            <button type="submit" className="register-button">
              Sign up
            </button>

            <Link to="/login" style={{ width: '100%' }}>
              <button type="button" className="login-button">
                I already have an account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
