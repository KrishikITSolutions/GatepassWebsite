

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function VisitorManagement() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Complete Visitor Management for Your Society
        </h1>

        <section className="mb-8">
          <p>
            Keep your society secure and organized with our powerful{" "}
            <strong>Visitor Management System</strong>. Whether it’s guests,
            delivery personnel, or daily helpers, <strong>GatePass</strong> ensures that every entry and exit is logged, monitored, and easily accessible to residents and society management.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Real-Time Visitor Tracking:</strong> Know exactly who is
              entering and leaving your society.
            </li>
            <li>
              <strong>Instant Notifications:</strong> Receive app alerts or
              calls as visitors arrive.
            </li>
            <li>
              <strong>Detailed Logs:</strong> Maintain a complete record of all
              visitors for safety and accountability.
            </li>
            <li>
              <strong>Easy Approvals:</strong> Approve or deny entry directly
              from your mobile app.
            </li>
            <li>
              <strong>Seamless Check-In:</strong> Guests can check in quickly —
              no delays, no manual paperwork.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p>
            Security is the foundation of a peaceful community. With{" "}
            <strong>GatePass</strong>, every visitor’s presence is recorded,
            ensuring a safe and transparent environment for both residents and
            management.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Engaging Note</h2>
          <p>
            Imagine never missing a visitor again or facing confusion at the
            gate — with <strong>GatePass</strong>, your society stays safe,
            organized, and stress-free.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}