"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacySummary() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Summary</h1>

        <h2 className="text-xl font-semibold mb-2">
          App Privacy Summary <span className="text-sm text-blue-600">(for gatePass.ai)</span>
        </h2>

        <p className="mb-6 text-lg">
          gatePass.ai is committed to protecting your personal data. Here’s how we ensure your privacy:
        </p>

        {/* What We Collect */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">🔒 What We Collect:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Resident: Name, contact, flat number, vehicle & staff info</li>
            <li>Visitors: Name, number, purpose (masked where possible)</li>
            <li>Device info: IP, app version, usage logs</li>
          </ul>
        </section>

        {/* Why We Collect It */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">📋 Why We Collect It:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>To enable secure entry/exit for residents, staff & guests</li>
            <li>To support digital approvals, alerts, society services & billing</li>
            <li>To improve app features, performance, and user safety</li>
          </ul>
        </section>

        {/* What We Don't Do */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">🚫 What We Don’t Do:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>No selling of your data</li>
            <li>No ad tracking or unnecessary permissions</li>
            <li>No access to your photos/camera/mic without consent</li>
          </ul>
        </section>

        {/* Your Controls */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">🛡️ Your Controls:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mask your phone/email from guards & residents</li>
            <li>Control what’s shared with RWAs & visitors</li>
            <li>Request data correction, access, or deletion anytime</li>
          </ul>
        </section>

        {/* Where Your Data Stays */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2">🗄️ Where Your Data Stays:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Stored securely on servers located in <strong>India</strong></li>
            <li>Protected with end-to-end encryption & role-based access</li>
          </ul>
        </section>

        {/* Want More */}
        <section>
          <h3 className="text-lg font-semibold mb-2">📄 Want More?</h3>
          <p>
            Read our full Privacy Policy in the app or at{" "}
            <a href="mailto:gatepassai@gmail.com" className="text-blue-600 hover:underline">
              gatepassai@gmail.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
