import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsSummary() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service Summary</h1>

        <p className="italic mb-4 text-gray-600">
          (Ideal for in-app popups, onboarding screens)
        </p>

        <p className="mb-6">
          Welcome to <strong>GatePass.ai</strong>! Here’s what you need to know before using the app:
        </p>

        <h2 className="text-xl font-semibold mb-2">🔐 Privacy & Data</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>We collect data like name, phone, flat number, visitor details, etc., to enhance community safety.</li>
          <li>We adhere to India’s <strong>DPDP Act, 2023</strong> ensuring your data remains private and secure.</li>
          <li>You control what data is visible to guards, admins, and neighbors.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">🛠️ What We Offer</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Digital gate entry for visitors</li>
          <li>Daily staff tracking and logs</li>
          <li>Delivery and vehicle management</li>
          <li>Emergency alerts & resident directory</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">🧍 Your Responsibility</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Keep your details accurate and up-to-date</li>
          <li>Do not misuse or tamper with app features</li>
          <li>Respect privacy—do not share others' data without permission</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">💸 Charges</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Most features are free for residents</li>
          <li>RWAs or management bodies may pay for premium features</li>
          <li>We will notify you in advance if any charges are applicable</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">⛔ Account & Termination</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You can leave the app anytime</li>
          <li>We reserve the right to suspend accounts that break rules or misuse the platform</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">📄 Legal</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>We’re not responsible for local disputes or how RWAs use shared data</li>
          <li>Using the app means you agree to all our Terms and Conditions</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">📮 Questions?</h2>
        <p className="mb-6">
          Write to us at: <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">gatepassai@gmail.com</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
