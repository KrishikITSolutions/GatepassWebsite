import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SmartDailyHelp() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Stay Informed About Daily Helpers and Guests
        </h1>

        <section className="mb-8">
          <p>
            <strong>GatePass</strong> helps you monitor daily helpers,
            deliveries, and visitors with real-time alerts. Every movement in
            your society is logged digitally, keeping residents informed and
            secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Instant Notifications:</strong> Know immediately when helpers or guests arrive.
            </li>
            <li>
              <strong>Digital Logs:</strong> Track who enters and exits in real-time.
            </li>
            <li>
              <strong>Custom Alerts:</strong> Set alerts for specific visitors or blocks.
            </li>
            <li>
              <strong>Enhanced Safety:</strong> Prevent unauthorized access and maintain awareness.
            </li>
            <li>
              <strong>Convenient Oversight:</strong> Both residents and RWA can monitor activities remotely.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p>
            Awareness ensures safety. With <strong>GatePass</strong>, you always
            know who’s inside your society — bringing peace of mind to every
            resident.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Engaging Note</h2>
          <p>
            Never be surprised by a visitor or delivery again —{" "}
            <strong>GatePass</strong> keeps your community informed and secure
            24/7.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}