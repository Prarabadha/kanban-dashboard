import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel";
import { IoIosRefresh } from "react-icons/io";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // Validate captcha first
    if (String(captchaAnswer) !== String(userCaptcha).trim()) {
      setError("Invalid captcha answer. Please try again.");
      generateCaptcha();
      setUserCaptcha("");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  function generateCaptcha() {
    // simple addition captcha between 1 and 9
    const a = Math.floor(Math.random() * 9) + 1
    const b = Math.floor(Math.random() * 9) + 1
    setCaptchaQuestion(`${a} + ${b} = ?`)
    setCaptchaAnswer(a + b)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

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

              {/* Captcha Box */}
              <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600 select-none">
                    {captchaQuestion}
                  </span>
                  <IoIosRefresh
                    onClick={generateCaptcha}
                    className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
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
