"use client";

import { useState, useEffect } from "react";
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

      // Store UI-safe info
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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded w-80">
        {step === "PHONE" && (
          <>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Mobile number"
              maxLength={10}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className={`w-full p-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-blue-600"
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
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className={`w-full p-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="mt-2 text-center text-gray-600">
              {timer > 0 ? (
                <span>Resend OTP in {timer}s</span>
              ) : (
                <button
                  className="text-blue-600 underline"
                  onClick={sendOtp}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {message && (
          <p className="text-red-600 mt-2 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
