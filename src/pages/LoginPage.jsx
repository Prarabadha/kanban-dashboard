import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInApi } from "../mockApiAuth";
import { toast } from "react-toastify";
import Carousel from "../Components/Carousel";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const res = await signInApi({ email, password });

    if (res.success) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(res.user));
      toast.success(res.message);
      navigate("/dashboard");
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <div className="flex gap-2 bg-white p-8 rounded-lg">
        <div className="w-[550px] rounded-lg  bg-white shadow-2xl  border border-gray-200">
           <Carousel/>
        </div>
        <div className="w-[550px] p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Kanban App
          </h2>

          {/* Login Form */}
          <form className="flex flex-col gap-5">
            {/* Email or Username */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-semibold">
                Email / Username
              </label>
              <input
                type="text"
                placeholder="Enter email or username"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {/* Captcha */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-semibold">Captcha</label>

              {/* Fake Captcha Box – replace with real logic later */}
              <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50">
                <span className="font-semibold text-gray-600 select-none">
                  5 + 3 = ?
                </span>
                <input
                  type="text"
                  placeholder="Answer"
                  className="border p-2 w-20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition-all duration-200 cursor-pointer`}
            >
              Login
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>

          {/* Footer */}
          <p className="text-center mt-5 text-gray-600 text-sm">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
