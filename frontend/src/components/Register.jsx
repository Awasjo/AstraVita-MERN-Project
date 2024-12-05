import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import heroImage from '/external/hero-image-medicine.jpg';
import logo from '/external/placeholderlogo1805-9za8-200h.png';
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
  const navigate = useNavigate();

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
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users/register', {
        ...formData
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed: ' + error.message);
    }
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
            <span className="font-bold">OneDrug ProbeiT</span> results
          </p>
        </div>
        <img
          className="absolute bottom-10 left-10 h-10 xl:left-40"
          src={logo}
          alt="OneDrug Logo"
        />
      </section>

      <div className="flex-1 bg-light-theme flex flex-col justify-start pt-24 items-center p-8 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          <img src={xMark} alt="Close" />
        </button>

        <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
          <h2 className="font-sans text-2xl font-bold mb-8 text-black">
            Create a OneDrug account
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
