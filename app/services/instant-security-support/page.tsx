import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function InstantSecuritySupport() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          One-Tap Access to Security Assistance
        </h1>

        <section className="mb-8">
          <p>
            Safety comes first. With <strong>GatePass</strong>, residents can
            instantly reach society security teams during emergencies or
            suspicious activities — ensuring fast, reliable support at all times.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Emergency Alerts:</strong> Notify security instantly with one tap.
            </li>
            <li>
              <strong>Quick Response:</strong> Security teams get location details immediately.
            </li>
            <li>
              <strong>24/7 Connectivity:</strong> Stay connected to security at all hours.
            </li>
            <li>
              <strong>Visitor Verification:</strong> Verify unfamiliar visitors instantly.
            </li>
            <li>
              <strong>Incident Reporting:</strong> Log incidents for review and follow-up.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p>
            Prompt security response can make all the difference.{" "}
            <strong>GatePass</strong> ensures your society is prepared for any
            situation with real-time communication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Engaging Note</h2>
          <p>
            Think of it as your digital security guard — always alert, always
            available when you need help most.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
