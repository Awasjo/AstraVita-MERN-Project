import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import heroImage from "/external/hero-image-medicine.jpg";
import logo from "/external/astravita-wordmark-white.png";
import xMark from "/external/iconmonstr-x-mark-9.svg";
import eye from "/external/iconmonstr-eye-filled.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const passwordInputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        if (response.data.user && response.data.user.role) {
          setUser(response.data.user);

          if (response.data.user.role === "Doctor") {
            navigate("/doctor", { state: { doctor: response.data.user } });
          } else if (response.data.user.role === "Patient") {
            navigate("/patient", { state: { patient: response.data.user } });
          }
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        "Login failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
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
