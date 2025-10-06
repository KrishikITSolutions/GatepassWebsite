"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png"
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // hardcoded credentials
  const validEmail = "admin@gmail.com";
  const validPassword = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === validEmail && password === validPassword) {
      // ✅ Fix: Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      router.push("/main-dashboard");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Header */}
        <div className="flex items-center justify-center relative mb-10">
          <h2 className="text-2xl font-bold text-center flex-1">Admin Portal</h2>
          <div className="absolute left-0">
            <Image src={logo} alt="App Logo" width={56} height={56} className="object-contain"/>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#28B8AE] hover:bg-[#239b96] text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
