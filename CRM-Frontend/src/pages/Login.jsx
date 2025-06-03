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
    <div className="flex items-center justify-center h-screen overflow-hidden" style={{ background: "#edf2f7" }}>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5" style={{
        background: "linear-gradient(to bottom, #14244a 0%, #14244a 20%, #101d3f 70%, #101d3f 100%)",
      }}>
        <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
          <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
            <div className="flex-col self-start hidden text-gray-200 lg:flex">
              <h1 className="my-3 text-4xl font-semibold">Welcome back</h1>
              <p className="pr-3 text-sm text-gray-200 opacity-75">
                MASTER BUILDER! It's time to breathe life into your blueprints and transform dreams into reality.
              </p>
            </div>
          </div>

          <div className="z-10 flex self-center justify-center">
            <form onSubmit={handleSubmit}>
              <div className="p-12 mx-auto bg-white rounded-3xl w-96">
                <div className="mb-7">
                  <h3 className="text-2xl font-semibold text-gray-800">Log In</h3>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="space-y-6">
                  <div>
                    <input
                      className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-indigo-500"
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      required
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

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-[#101d3f] hover:bg-indigo-500 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex items-center justify-center my-5 space-x-2">
                    <span className="h-px bg-gray-100 w-36"></span>
                    <span className="h-px bg-gray-100 w-36"></span>
                  </div>
                </div>

                <div className="text-xs text-center text-gray-300 mt-7">
                  <span>
                    Copyright © 2025-2026{" "}
                    <a
                      href="https://codepen.io/uidesignhub"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-[#101d3f] hover:text-indigo-500"
                      title="Codepen aji"
                    >
                      Soff Cricket
                    </a>
                  </span>
                </div>
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
    </div>
  );
};

export default NewLogin;
