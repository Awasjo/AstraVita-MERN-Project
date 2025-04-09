import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import heroImage from '/external/hero-image-medicine.jpg';
import logo from '/external/astravita-wordmark-white.png';
import xMark from '/external/iconmonstr-x-mark-9.svg';
import eye from '/external/iconmonstr-eye-filled.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'Patient',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showDemoHint, setShowDemoHint] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'email') setEmailError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email address');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // In demo mode, simulate registration
    setTimeout(() => {
      // Create a demo user
      const demoUser = {
        _id: `demo_${Date.now()}`,
        id: `demo_${Date.now()}`,
        ...formData,
        doctors: [],
        patients: []
      };
      
      // Set this user in context
      setUser(demoUser);
      
      toast.success("Registration successful in demo mode!");
      if (formData.role === 'Doctor') {
        navigate('/doctor', { state: { doctor: demoUser } });
      } else {
        navigate('/patient', { state: { patient: demoUser } });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <section
        className="flex-1 bg-cover bg-center p-8 text-white relative hidden md:block"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute top-20 left-10 max-w-96 xl:left-40">
          <h1 className="font-serif text-4xl font-semibold mb-4">
            Start building your comprehensive genomic profile today.
          </h1>
          <p className="font-sans text-lg leading-none">
            Log in or create an account to view your{" "}
            <span className="font-bold">AstraVita BioScan</span> results
          </p>
        </div>
        <img
          className="absolute bottom-10 left-10 h-10 xl:left-40"
          src={logo}
          alt="AstraVita Logo"
        />
      </section>

      <div className="flex-1 bg-light-theme flex flex-col justify-start pt-24 items-center p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          <img src={xMark} alt="Close" />
        </button>
        
        {showDemoHint && (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-8 w-full max-w-md">
            <button 
              className="absolute top-24 right-10 text-blue-500"
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
                  <span className="font-bold">DEMO MODE:</span> Fill out this form to create a temporary demo account.
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Account data will only persist for this session and won't be saved to any database.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
          <h2 className="font-sans text-2xl font-bold mb-8 text-black">
            Create a AstraVita account
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue focus:border-light-blue sm:text-sm"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue focus:border-light-blue sm:text-sm"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-blue focus:border-dark-blue sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-8 md:inset-y-7 right-0 pr-3"
            >
              <img
                src={eye}
                className="h-auto w-6 md:h-auto md:w-8"
                alt="Toggle Password Visibility"
              />
            </button>
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-blue focus:border-dark-blue sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-8 md:inset-y-7 right-0 pr-3"
            >
              <img
                src={eye}
                className="h-auto w-6 md:h-auto md:w-8"
                alt="Toggle Password Visibility"
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue focus:border-light-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue focus:border-light-blue sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">I am a...</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-light-blue focus:border-light-blue sm:text-sm"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <button
              type="submit"
              className="bg-dark-blue text-light-theme px-6 py-3 rounded-md font-bold"
            >
              Sign up
            </button>
            <Link
              to="/login"
              className="bg-gray-color text-dark-blue px-6 py-3 rounded-md font-bold text-center"
            >
              I already have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
