"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  // UUID device token for this session
  const deviceTokenRef = useRef(uuidv4());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
      setResendDisabled(true);
    } else if (timer <= 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // ================= SEND OTP =================
  const sendOtp = async () => {
    setMessage("");

    // ✅ Validation: only 10-digit number
    if (!phone || phone.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      // ❌ Not authorized or error
      if (!res.ok) {
        setMessage(
          data.message ||
            "You are not authorized to access this portal. Please contact the community administrator."
        );
        return;
      }

      // ✅ Success
      setStep("otp");
      setTimer(60);
      setMessage("OTP sent! Valid for 60 seconds.");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    setMessage("");

    // ✅ OTP validation
    if (otp.length !== 6) {
      setMessage("Enter the 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          code: otp,
          device_token: deviceTokenRef.current, // UUID token
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid or expired OTP");
        return;
      }

      // ✅ Store auth data in localStorage
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          role: data.role,
          society_id: data.society_id,
          device_token: data.device_token,
        })
      );

      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  const resendOtp = () => sendOtp();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/gpbg.png')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-md shadow-md w-80">
        {step === "phone" && (
          <>
            <h2 className="text-2xl mb-4 text-center">Login</h2>

            {/* ✅ Only 10 digits */}
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setPhone(value);
                setMessage("");
              }}
              className="w-full mb-4 p-2 border rounded"
            />

            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl mb-4 text-center">Enter OTP</h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full mb-2 p-2 border rounded"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-2"
            >
              Verify OTP
            </button>

            <div className="flex justify-between items-center">
              <span>Valid for: {timer}s</span>
              <button
                onClick={resendOtp}
                disabled={resendDisabled}
                className={`text-blue-600 underline ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend
              </button>
            </div>
          </>
        )}

        {message && (
          <p className="mt-4 text-red-600 text-center text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}
