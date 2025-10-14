import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Payments() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Fast, Secure, and Transparent Payments
        </h1>

        <section className="mb-8">
          <p>
            Managing society payments has never been easier.{" "}
            <strong>GatePass</strong> enables residents to pay maintenance fees,
            monthly dues, or other charges directly through the app, ensuring
            smooth and transparent transactions for everyone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Instant Transactions:</strong> Pay anytime, anywhere — no
              queues, no hassle.
            </li>
            <li>
              <strong>Secure & Encrypted:</strong> Your financial data stays
              protected with top-grade encryption.
            </li>
            <li>
              <strong>Full Transparency:</strong> View payment history,
              receipts, and dues at a glance.
            </li>
            <li>
              <strong>Automated Reminders:</strong> Never miss a due date with
              smart notifications.
            </li>
            <li>
              <strong>Simplified RWA Management:</strong> Society admins can
              track payments and generate reports instantly.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p>
            Simplifying payments saves time and avoids confusion. Both residents
            and the RWA benefit from clear records and effortless management.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Engaging Note</h2>
          <p>
            Imagine settling your society dues in seconds — no paperwork, no
            delays. <strong>GatePass</strong> brings you peace of mind and
            perfect payment clarity.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}