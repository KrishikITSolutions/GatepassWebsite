"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow select-none" onContextMenu={(e) => e.preventDefault()}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-lg mb-6">
          <strong>Privacy Policy</strong> tailored for an{" "}
          <strong>RWA (Resident Welfare Association)</strong> that uses a mobile or web
          application to manage society operations. This policy assumes the app is used to
          manage residents, visitors, staff, complaints, amenities, billing, etc., and does{" "}
          <strong>not share data with third parties</strong>.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Privacy Policy for RWA App</h2>
        <p className="mb-6">
          GATE PASS is committed to protecting the privacy of all residents, visitors, and
          service providers using our Resident Welfare Association (RWA) platform. This
          Privacy Policy outlines how we collect, use, and safeguard your personal
          information.
        </p>

        {/* 1. Information We Collect */}
        <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
        <p className="mb-2">We may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Personal Information:</strong> Name, mobile number, email address, flat/unit number, and emergency contact.</li>
          <li><strong>Visitor & Staff Information:</strong> Names, contact details, time logs for entry/exit, and photos (if required).</li>
          <li><strong>Complaint and Request Data:</strong> Issues raised by residents and their resolution status.</li>
          <li><strong>Payment Information:</strong> Details related to society maintenance dues, billing history, and payment confirmations.</li>
        </ul>

        {/* 2. How We Use Your Information */}
        <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
        <p className="mb-2">We use your data to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Manage residents, staff, and visitor records effectively</li>
          <li>Enhance community safety and transparency</li>
          <li>Improve service delivery within the society</li>
          <li>Facilitate communication and support services</li>
          <li>Generate reports and analytics for RWA administration</li>
        </ul>

        {/* 3. Data Sharing and Disclosure */}
        <h3 className="text-xl font-semibold mb-2">3. Data Sharing and Disclosure</h3>
        <p className="mb-2">
          <strong>We do not share your personal data with third parties</strong>, unless:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>It is required by law or legal process</li>
          <li>It is necessary to enforce our terms or protect rights and safety</li>
          <li>You have explicitly consented to such sharing</li>
        </ul>

        {/* 4. Data Storage and Security */}
        <h3 className="text-xl font-semibold mb-2">4. Data Storage and Security</h3>
        <p className="mb-6">
          We store your data on secure servers and implement reasonable security measures to protect it
          against unauthorized access, alteration, or destruction. Access to your data is limited to
          authorized RWA members and administrators.
        </p>

        {/* 5. User Rights */}
        <h3 className="text-xl font-semibold mb-2">5. User Rights</h3>
        <p className="mb-2">
          Depending on applicable laws (such as India’s DPDP Bill or GDPR, if relevant), you may have
          the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Access your personal data</li>
          <li>Request corrections or deletion</li>
          <li>Withdraw consent for data use</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, contact your RWA or the app support team at:<br />
          <strong>Email:</strong> <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">gatepassai@gmail.com</a><br />
          <strong>Phone:</strong> <a href="tel:+918331822131" className="text-blue-600 underline">+91 8331822131</a>
        </p>

        {/* 6. Data Retention */}
        <h3 className="text-xl font-semibold mb-2">6. Data Retention</h3>
        <p className="mb-6">
          We retain your personal data as long as your membership or residence is active in the society.
          Upon moving out or after a specific period of inactivity, your data may be archived or deleted,
          unless required for legal or audit purposes.
        </p>

        {/* 7. Changes to This Policy */}
        <h3 className="text-xl font-semibold mb-2">7. Changes to This Policy</h3>
        <p className="mb-6">
          We may update this policy to reflect changes in law or our practices. Updated policies will be
          notified through the app or official RWA communication channels.
        </p>

        {/* 8. Contact Us */}
        <h3 className="text-xl font-semibold mb-2">8. Contact Us</h3>
        <p className="mb-4">For questions or concerns regarding this privacy policy, please contact:</p>
        <p className="mb-2">
          <strong>Grievance officer:</strong> Anurag M<br />
          <strong>Email:</strong>{" "}
          <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">
            gatepassai@gmail.com
          </a>
          <br />
          <strong>Phone:</strong>{" "}
          <a href="tel:+918331822131" className="text-blue-600 underline">
            +91 8331822131
          </a>
        </p>
        <p className="mb-2">
          <strong>Company Name:</strong> Krishik Ai Services LLP
        </p>
        <p>
          <strong>Address:</strong><br />
          1/418-8-1, Opp Maruthi Nagar, Near Anjaneya Swamy Temple, Mundy Bazar, Cuddapah,<br />
          Andhra Pradesh, India, 516001
        </p>
      </main>
      <Footer />
    </div>
  );
}
