"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // ===== SEND OTP =====
  const sendOtp = async () => {
    setMessage("");
    if (phone.length !== 10) {
      setMessage("Enter a valid 10-digit number");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to send OTP");
        return;
      }

      setStep("OTP");
      setMessage("OTP sent successfully");
      setTimer(30); // 30s timer for resend
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again");
    } finally {
      setLoading(false);
    }
  };

  // ===== OTP RESEND TIMER =====
  useEffect(() => {
    if (step === "OTP" && timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [step, timer]);

  // ===== VERIFY OTP =====
  const verifyOtp = async () => {
    setMessage("");
    if (otp.length !== 6) {
      setMessage("Enter 6-digit OTP");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          role: data.role,
          society_id: data.society_id,
        })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again");
    } finally {
      setLoading(false);
    }
  };

  // ===== STYLED LOGIN PAGE =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7f6] to-[#c8f3ef] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left Side Banner */}
        <div className="bg-gradient-to-br from-[#28B8AE] to-[#15958c] text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Welcome to Portal
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Secure access to your dashboard and services — all from one place.
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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {step === "PHONE" && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full p-3 border rounded-full bg-white focus:ring-2 focus:ring-[#28B8AE] outline-none transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className={`w-full py-3 rounded-full text-white font-semibold text-lg shadow-md transition ${
                    loading ? "bg-gray-400" : "bg-[#28B8AE] hover:bg-[#239b96]"
                  }`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {step === "OTP" && (
              <>
                <p className="mb-2 text-center text-gray-700">
                  OTP sent to {phone.replace(/(\d{2})(\d{4})(\d{4})/, "+91 $1 **** $3")}
                </p>
                <div>
                  <label className="block text-sm font-semibold mb-2">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full p-3 border rounded-full bg-white focus:ring-2 focus:ring-[#28B8AE] outline-none transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={loading}
                  className={`w-full py-3 rounded-full text-white font-semibold text-lg shadow-md transition ${
                    loading ? "bg-gray-400" : "bg-[#28B8AE] hover:bg-[#239b96]"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="mt-2 text-center text-gray-600">
                  {timer > 0 ? (
                    <span>Resend OTP in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      className="text-[#28B8AE] underline"
                      onClick={sendOtp}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            {message && (
              <p className="text-red-500 text-sm text-center mt-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
