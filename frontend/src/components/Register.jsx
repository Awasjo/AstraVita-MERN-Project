import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
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
    <div>
      <section style={{ backgroundImage: `url(${heroImage})` }}>
        <div>
          <h1>Start building your comprehensive genomic profile today.</h1>
          <p>Create an account to access OneDrug ProbeiT results</p>
        </div>
        <img src={logo} alt="OneDrug Logo"/>
      </section>

      <div>
        <form onSubmit={handleSubmit} noValidate>
          <h2>Create a OneDrug account</h2>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value); 
                setEmailError('');
              }}
              placeholder="Enter your email"
            />
            {emailError && <p>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>I have read and agreed to OneDrug's User Agreement and Privacy Policy</span>
            </label>
          </div>
          <div>
            <button type="submit">
              Sign up
            </button>

            <Link to="/login" style={{ width: '100%' }}>
              <button type="button">
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
