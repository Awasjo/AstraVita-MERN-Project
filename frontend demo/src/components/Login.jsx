import React, { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import heroImage from "/external/hero-image-medicine.jpg";
import logo from "/external/astravita-wordmark-white.png";
import xMark from "/external/iconmonstr-x-mark-9.svg";
import eye from "/external/iconmonstr-eye-filled.svg";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useContext(AuthContext);
  const passwordInputRef = useRef(null);
  const [showDemoHelp, setShowDemoHelp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // For demo purposes, let's provide some sample logins
    const result = login(username, password);
    
    if (result.success) {
      // In a demo, we might want to navigate to different places based on role
      if (result.user.role === "Doctor") {
        navigate("/doctor", { state: { doctor: result.user } });
        toast.success("Logged in as Doctor: " + result.user.firstName + " " + result.user.lastName);
      } else if (result.user.role === "Patient") {
        navigate("/patient", { state: { patient: result.user } });
        toast.success("Logged in as Patient: " + result.user.firstName + " " + result.user.lastName);
      }
    } else {
      toast.error(result.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  // Quick login functions for demo
  const loginAsDoctor = () => {
    setUsername("dr.johnson");
    setPassword("demo123");
  };

  const loginAsPatient = () => {
    setUsername("jsmith");
    setPassword("demo123");
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
          <img src={xMark} />
        </button>
        
        {/* Demo Mode Banner */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-8 w-full max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-bold">DEMO MODE</span>
                {!showDemoHelp && (
                  <button 
                    onClick={() => setShowDemoHelp(true)}
                    className="ml-2 underline text-blue-600"
                  >
                    Show Credentials
                  </button>
                )}
              </p>
              {showDemoHelp && (
                <div className="mt-2 text-sm text-blue-700">
                  <p className="font-bold">Demo Accounts:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li><strong>Doctors:</strong> dr.johnson or dr.chen</li>
                    <li><strong>Patients:</strong> jsmith, edavis, or rwilson</li>
                    <li>Any password will work in demo mode</li>
                  </ul>
                  <div className="mt-2 flex space-x-2">
                    <button 
                      onClick={loginAsDoctor}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
                    >
                      Login as Dr. Johnson
                    </button>
                    <button 
                      onClick={loginAsPatient}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
                    >
                      Login as John Smith
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md">
          <h2 className="font-sans text-2xl font-bold mb-8 text-black">
            Log in to AstraVita
          </h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              ref={passwordInputRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dark-blue focus:border-dark-blue sm:text-sm"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-8 md:inset-y-7 right-0 pr-3"
            >
              <img
                src={eye}
                className="h-auto w-6 md:h-auto md:w-8"
                alt="Toggle Password Visibility"
              />
            </button>
          </div>

          <div className="flex sm:items-center justify-between mb-6 sm:flex-row flex-col">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-dark-blue focus:ring-dark-blue border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-strong-blue font-bold text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="bg-dark-blue text-light-theme px-6 py-3 rounded-md font-bold"
            >
              Log in
            </button>
            <Link
              to="/register"
              className="bg-gray-color text-dark-blue px-6 py-3 rounded-md font-bold text-center"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
