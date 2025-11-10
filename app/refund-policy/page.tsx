
"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow select-none" onContextMenu={(e) => e.preventDefault()}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Refund Policy (Monthly Maintenance)
        </h1>

        <section className="mb-8">
          <p>
            Payments made through <strong>GatePass</strong> for{" "}
            <strong>monthly society maintenance charges</strong> are generally
            non-refundable. However, under certain exceptional circumstances,
            refunds may be considered as per the policy below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Eligible Refund Scenarios</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Duplicate or accidental payments.</li>
            <li>Technical errors during payment processing.</li>
            <li>
              Verified discrepancies in billing or payment amount confirmed by
              society administration.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. How to Request a Refund</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Send an email to:{" "}
              <a
                href="mailto:gatepassai@gmail.com"
                className="text-blue-600 underline"
              >
                gatepassai@gmail.com
              </a>
            </li>
            <li>
              Include the following details: Transaction ID, Payment Date,
              Payment Amount, and Reason for Refund.
            </li>
            <li>
              Refund requests must be submitted within{" "}
              <strong>7 working days</strong> from the payment date.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Processing Timeline</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Approved refunds will be processed within 7–10 business days.</li>
            <li>
              Refunds will be credited back to the original payment method used.
            </li>
            <li>
              All refund requests will be verified by the Society Administration
              and GatePass Support Team.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Important Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Refund eligibility is at the discretion of society management.
            </li>
            <li>
              GatePass is not responsible for delays caused by banks or payment
              gateways.
            </li>
            <li>
              Residents are advised to check their monthly maintenance invoice
              before making payments.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}