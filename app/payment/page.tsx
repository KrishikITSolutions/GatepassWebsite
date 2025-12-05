import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Payment() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          How Users Will Use Paytm Through GatePass
        </h1>

       <section className="mb-8">
  
  <p>
    GatePass enables residents, associations, and property managers to make
    secure and seamless digital payments for their community-related services.
    By integrating Paytm’s payment gateway, GatePass ensures fast, reliable,
    and compliant transactions within the app.
  </p>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-3">Purpose of Using Paytm</h2>

  <p className="mb-3">
    Users will use Paytm within GatePass specifically to complete
    community-related payments, such as:
  </p>

  <ul className="list-disc list-inside space-y-2">
    <li>Monthly maintenance charges</li>
    <li>Visitor/guest pass fees (if applicable)</li>
    <li>Facility or amenity booking charges (clubhouse, guest rooms, halls, etc.)</li>
    <li>Parking fees or access card charges</li>
    <li>Event fees issued by the association</li>
    <li>Any other authorized community/association payments</li>
  </ul>

  <p className="mt-3">
    GatePass does <strong>not</strong> use Paytm for any unrelated or external
    commerce activities. All payments processed are strictly for residential
    community management.
  </p>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-3">How the Payment Flow Works</h2>

  <h3 className="text-xl font-semibold mb-2">Step 1: Bill Generation</h3>
  <p className="mb-4">
    The resident’s association generates a maintenance bill or fee through
    GatePass’s admin dashboard.
  </p>

  <h3 className="text-xl font-semibold mb-2">Step 2: User Views the Bill</h3>
  <p className="mb-4">
    Residents open the GatePass mobile app and view the bill along with due
    dates and breakup details.
  </p>

  <h3 className="text-xl font-semibold mb-2">Step 3: Payment Via Paytm</h3>
  <p className="mb-4">
    When the user clicks <strong>“Pay Now”</strong>, they are redirected to
    Paytm’s secure payment gateway screen where they can pay using:
  </p>

  <ul className="list-disc list-inside space-y-2">
    <li>Paytm Wallet</li>
    <li>UPI</li>
    <li>Debit/Credit Cards</li>
    <li>Net Banking</li>
    <li>Paytm Postpaid (if eligible)</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6 mb-2">Step 4: Confirmation</h3>
  <p className="mb-4">
    Once the payment succeeds:
  </p>

  <ul className="list-disc list-inside space-y-2">
    <li>Paytm sends a confirmation to GatePass</li>
    <li>The user sees a paid receipt inside the app</li>
    <li>The association receives a real-time payment update</li>
  </ul>

  <p className="mt-3">
    GatePass does not store any card or wallet details. All sensitive payment
    information remains with Paytm as per RBI and PCI-DSS compliance.
  </p>
</section>

<section className="mb-8">
  <h2 className="text-2xl font-semibold mb-3">
    Merchant Category Code (MCC)
  </h2>

  <p className="mb-3">
    For residential community payments, the typical MCC category used by
    property management platforms is:
  </p>

  <p className="font-semibold mb-3">
    MCC: 6513 — “Real Estate Agents and Managers – Rentals and Property Management”
  </p>

  <p>
    (Or any MCC recommended by Paytm/bank for Housing Societies, RWAs, or
    Property Management Services.)  
    <br />
    GatePass does not handle any commercial retail transactions. All payments
    are purely service-based and community-related.
  </p>
</section>

      </main>
      <Footer />
    </div>
  );
}