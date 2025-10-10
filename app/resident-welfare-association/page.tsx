import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ResidentWelfareAssociation() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          Smarter Society Management for RWA
        </h1>

        <section className="mb-8">
          <p>
            <strong>GatePass</strong> offers RWA members a powerful dashboard to
            manage society operations efficiently. From payments to notices and
            communication, everything stays connected and transparent in one
            place.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Features & Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Maintenance Tracking:</strong> Monitor residents’
              payments and dues easily.
            </li>
            <li>
              <strong>Instant Notices & Announcements:</strong> Communicate
              updates instantly to all residents.
            </li>
            <li>
              <strong>Resident Interaction:</strong> Manage queries and feedback
              seamlessly.
            </li>
            <li>
              <strong>Transparent Communication:</strong> Keep everyone informed
              in real-time.
            </li>
            <li>
              <strong>Activity Reports:</strong> Generate detailed insights on
              payments, visitors, and security.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p>
            Transparency builds trust. With <strong>GatePass</strong>, RWA
            management becomes more organized, responsive, and resident-friendly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Engaging Note</h2>
          <p>
            Imagine a society where every update is clear, payments are smooth,
            and communication is instant — <strong>GatePass</strong> makes that
            vision real.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}