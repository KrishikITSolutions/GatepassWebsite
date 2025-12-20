"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [message, setMessage] = useState("");

  // ================= SEND OTP =================
  const sendOtp = async () => {
    setMessage("");

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
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    setMessage("");

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

    // ✅ Store ONLY UI-safe info
  localStorage.setItem(
  "auth_user",
  JSON.stringify({
    role: data.role,
    society_id: data.society_id,
  })
);

    // ✅ Redirect
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 bg-white shadow-md rounded w-80">
        {step === "PHONE" && (
          <>
            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Mobile number"
              maxLength={10}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "OTP" && (
          <>
            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="text-red-600 mt-2 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
