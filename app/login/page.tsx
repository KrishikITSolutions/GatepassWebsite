"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validEmail = "admin@gmail.com";
  const validPassword = "123456";

  const handleSignIn = (e: any) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/main-dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7f6] to-[#c8f3ef] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left Side Banner */}
        <div className="bg-gradient-to-br from-[#28B8AE] to-[#15958c] text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Welcome to Admin Portal
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Manage payments, dashboards, users, and more — all from one place.
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <Image
              src={logo}
              alt="App Logo"
              width={120}
              height={120}
              className="drop-shadow-xl"
            />
          </div>

          <p className="mt-10 text-sm opacity-80 text-center">
            Smart  • Living • Simplified
          </p>
        </div>

        {/* Right Authentication Area */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#28B8AE] text-center mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-full bg-white focus:ring-2 focus:ring-[#28B8AE] outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-full bg-white focus:ring-2 focus:ring-[#28B8AE] outline-none transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#28B8AE] hover:bg-[#239b96] text-white py-3 rounded-full font-semibold text-lg shadow-md transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Extra Options */}
          <button
            className="w-full border border-gray-300 py-3 rounded-full font-medium hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Forgot your password?{" "}
            <span className="text-[#28B8AE] underline cursor-pointer">
              Reset here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
