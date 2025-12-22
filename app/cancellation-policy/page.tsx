

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Cancellation Policy (Monthly Maintenance)
        </h1>

        {/* Overview Section */}
        <section className="mb-8">
          <p>
            Monthly maintenance charges are <strong>compulsory contributions</strong> 
             for the upkeep of the society and cannot generally be cancelled once billed. 
            This policy explains the rules for cancellation and adjustments.
          </p>
        </section>

        {/* Non-Cancellable Payments */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Non-Cancellable Payments</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Once a monthly maintenance bill is generated and paid, it cannot be cancelled or reversed.
            </li>
            <li>
              Residents cannot opt out of maintenance charges for an active billing cycle.
            </li>
          </ul>
        </section>

        {/* Move-Out / Transfer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Move-Out / Transfer of Ownership</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              If a resident moves out of the society or transfers ownership of their unit, 
              charges will only apply until the <strong>official move-out/transfer date</strong> 
              confirmed by the RWA/management.
            </li>
            <li>
              Any advance payments (if applicable) may be:
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Adjusted in the following billing cycle, or</li>
                <li>Settled during exit, subject to RWA approval.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Disputes & Adjustments */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Disputes & Adjustments</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              If there is a dispute in the billed amount (for example, wrong calculation 
              or extra charges), the resident can raise a request with the RWA.
            </li>
            <li>
              After verification, the amount will either be adjusted in the next billing 
              cycle or refunded as per the Refund Policy.
            </li>
          </ul>
        </section>

        {/* Important Notes */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Important Notes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Cancellation requests outside of the above scenarios will not be accepted.</li>
            <li>Residents are advised to check their invoices carefully before making payments.</li>
            <li>Society management holds the final decision on all cancellation and adjustment requests.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}