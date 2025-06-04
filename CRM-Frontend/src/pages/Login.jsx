import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';

const NewLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Dummy login logic for frontend-only version
    if (username && password) {
      Swal.fire({
        title: "Success!",
        text: "Mock login successful!",
        icon: "success",
        confirmButtonColor: '#001b5e',
        cancelButtonColor: '#6b7280',
      });

      // Dummy route for successful login
      navigate("/dashboard");
    } else {
      setError("Please enter a username and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#edf2f7]">
      <div className="flex bg-white rounded-3xl shadow-2xl w-[800px] h-[400px] overflow-hidden">

        {/* Left Side - Welcome */}
        <div className="hidden lg:flex flex-col justify-center bg-[#101d3f] text-white px-10 w-1/2">
          <h1 className="text-4xl  font-bold mb-6">Welcome back</h1>
         <p className="text-sm opacity-80 leading-relaxed">
  SOFF CRM is the official system for managing operations at SOFF Cricket — Toronto's top indoor cricket facility. Handle bookings, schedules, members, and team coordination all in one place.
</p>


        </div>

        {/* Right Side - Login */}
        <div className="w-full lg:w-1/2 p-10">
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Log In</h3>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="space-y-6">
              <input
                className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-indigo-500"
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-sm leading-5">
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    className={`h-4 text-[#101d3f] cursor-pointer ${showPassword ? "hidden" : "block"}`}
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144z" />
                  </svg>
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    className={`h-4 text-[#101d3f] cursor-pointer ${showPassword ? "block" : "hidden"}`}
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82C58.41 203.12 45.72 221.41 35.48 241.41a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center bg-[#101d3f] hover:bg-indigo-500 text-white p-3 rounded-lg font-semibold transition duration-300"
              >
                Log in
              </button>
            </div>

            <div className="text-xs text-center text-gray-400 mt-6">
              © 2025  –  2026   <span className="text-[#101d3f] font-semibold">   Soff Cricket</span>
            </div>
          </form>
        </div>

          <footer className="absolute bottom-0 left-0 z-30 w-full bg-transparent">
            <div className="container flex items-center justify-between p-5 mx-auto">
              <div className="flex mr-auto">
                <a
                  href="https://codepen.io/uidesignhub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-gray-700 focus:outline-none"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    alt="logo"
                    className="object-cover mx-auto rounded-full w-14 h-14"
                  />
                  <p className="text-4xl">
                    Soff<strong>Crircket</strong>
                  </p>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

  );
};

export default NewLogin;
