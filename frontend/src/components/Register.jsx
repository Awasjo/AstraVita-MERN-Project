import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import heroImage from '/external/hero-image-medicine.jpg';
import logo from '/external/placeholderlogo1805-9za8-200h.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'Patient',
    termsAccepted: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/users/register', {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
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
          <h1 className="hero-title">
            Start building your comprehensive genomic profile today.
          </h1>
          <p className="hero-subtitle">
            Create an account to access OneDrug ProbeiT results
          </p>
        </div>
        <img src={logo} alt="OneDrug Logo" className="hero-logo" />
      </section>

      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Create a OneDrug account</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="terms-group">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
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