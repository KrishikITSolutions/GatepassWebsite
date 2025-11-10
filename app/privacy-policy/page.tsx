"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main
        className="max-w-5xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          GatePass.ai – Privacy Policy
        </h1>

        <p className="text-lg mb-6">
          <strong>Last Updated: October 2025</strong>
          <br />
          <br/>
          
          Welcome to <strong>GatePass.ai</strong>, an <strong>AI-powered visitor and community
          management platform</strong> designed for secure, paperless, and intelligent access
          control.
          <br />
          Your privacy is our top priority. This <strong>Privacy Policy </strong>explains how we collect,
          use, store, and protect your personal data when you use our app, website, or
          related digital services (collectively referred to as the “Platform”).
          <br />
          By using GatePass.ai, you agree to the terms outlined below. If you do not
          agree, please discontinue using the Platform.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="mb-3">
          GatePass.ai collects only the information necessary to operate a <strong>secure digital
          gate pass system</strong> and provide <strong>AI-powered visitor management</strong> for <strong>Resident Welfare
          Associations (RWAs)</strong>, communities, and organizations.
        </p>
        <p className="mb-2">We may collect:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Resident Information:</strong> Name, phone number, email, flat/unit
            number, vehicle details, and emergency contact.
          </li>
          <li>
            <strong>Visitor & Staff Data:</strong> Name, contact number, entry/exit
            timestamps, purpose of visit, and optional photo for verification.
          </li>
          <li>
            <strong>Device & Usage Data:</strong> IP address, device type, app version, and
            feature interaction logs.
          </li>
          <li>
            <strong>Complaint & Request Data:</strong> Resident service requests,
            complaints, and resolution status.
          </li>
          <li>
            <strong>Payment Information:</strong> Maintenance billing, transaction history,
            and payment confirmations (processed securely via trusted gateways).
          </li>
        </ul>

        <p className="mb-6">
          We do <strong>not</strong> collect unnecessary permissions or personal media (camera, microphone,
          photos) without explicit consent.
        </p>

        {/* 2. How We Use Your Information */}
        <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
        <p className="mb-3">
          Your data is used to ensure seamless, safe, and transparent community management.
          GatePass.ai uses this data to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Enable <strong>secure visitor entry/exit</strong> and digital gate pass verification</li>
          <li>Manage <strong>residents, staff, and delivery personnel</strong></li>
          <li>Improve app performance and provide personalized experiences</li>
          <li>Facilitate community communication, billing, and maintenance tracking</li>
          <li>
            Generate anonymized analytics to improve services and AI accuracy
          </li>
          <li>
            Ensure compliance with <strong>India’s</strong>{" "}
            <a
              href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              <strong>DPDP Act 2023</strong>
            </a>{" "}
            and local data protection norms
          </li>
        </ul>

        <p className="mb-6">
          We do <strong>not sell or rent</strong> your data to advertisers or unauthorized third parties.
        </p>

        {/* 3. Data Sharing */}
        <h2 className="text-2xl font-semibold mb-3">
          3. Data Sharing and Third-Party Access
        </h2>
        <p className="mb-3">
          GatePass.ai <strong>does not share</strong> your personal data with any external organization
          except in the following cases:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>When required by <strong>law, regulation, or legal request</strong></li>
          <li>
            <strong>To protect rights, property, or safety </strong>of the community or users
          </li>
          <li>
            When you have <strong>explicitly consented</strong> to such sharing (e.g., integrated payment or
            communication services)
          </li>
        </ul>

        <p className="mb-6">
          Third-party service providers (like <strong>payment gateways or SMS APIs</strong>) operate under
          strict data protection agreements and limited access.
        </p>

        {/* 4. Data Storage */}
        <h2 className="text-2xl font-semibold mb-3">4. Data Storage and Security</h2>
        <p className="mb-3">
          Your data is securely stored on <strong>encrypted servers located in India</strong>, ensuring
          compliance with the <strong> Digital Personal Data Protection Act</strong>{" "}
          <a
            href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            <strong>DPDP Act 2023</strong>
          </a>
          .
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>End-to-end encryption for sensitive data</li>
          <li>Role-based access for admins, RWAs, and guards</li>
          <li>Regular audits and secure cloud infrastructure</li>
          <li>Data backups and restricted access protocols</li>
        </ul>

        <p className="mb-6">
          Only authorized personnel can access necessary data to perform operational
          duties.
        </p>

        {/* 5. User Rights */}
        <h2 className="text-2xl font-semibold mb-3">5. User Rights and Controls</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <p>As a user of<strong> GatePass.ai, </strong>you have full control over your personal data. You can:</p>
          <li>Mask your<strong> phone number or email ID</strong> from guards or other residents</li>
          <li>Control what is shared with <strong>RWAs, visitors, or administrators</strong></li>
          <li>Request<strong> data correction, access, or deletion</strong> anytime</li>
          <li>Withdraw consent for specific data uses</li>
        </ul>

        <p className="mb-6">
          To exercise these rights, please contact our <strong>Data Protection Team </strong>at:
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">
            gatepassai@gmail.com
          </a>
          <br />
          <strong>Phone:</strong>{" "}
          <a href="tel:+918331822131" className="text-blue-600 underline">
            +91 83318 22131
          </a>
        </p>

        {/* 6. Data Retention */}
        <h2 className="text-2xl font-semibold mb-3">6. Data Retention Policy</h2>
        <p className="mb-6">
          We retain your personal data for as long as you remain an active member of your
          society or organization on the<strong> GatePass.ai platform.</strong> After you move out or your
          account is deactivated:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Your data is archived or deleted as per legal retention timelines</li>
          <li>
            Certain logs may be preserved for audit, billing, or security verification
            purposes
          </li>
        </ul>

        <p className="mb-6">
          All retention and deletion practices follow{" "}
          <a
            href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
           <strong> DPDP Act 2023</strong>
          </a>{" "}
          guidelines.
        </p>

        {/* 7. Updates */}
        <h2 className="text-2xl font-semibold mb-3">
          7. Updates to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may periodically update this Privacy Policy to reflect new features, security
          upgrades, or legal requirements. All changes will be notified via in-app alerts,
          email, or the website. Your continued use of the Platform after such updates
          signifies your acceptance of the revised terms.
        </p>

        {/* 8. Contact */}
        <h2 className="text-2xl font-semibold mb-3">
          8. Contact and Grievance Redressal
        </h2>
        <p className="mb-6">
          If you have questions, complaints, or concerns about your personal data, please
          contact our Grievance Officer:
          <br />
          <strong>Grievance Officer:</strong> Anurag M
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">
            gatepassai@gmail.com
          </a>
          <br />
          <strong>Phone:</strong>{" "}
          <a href="tel:+918331822131" className="text-blue-600 underline">
            +91 83318 22131
          </a>
          <br />
          <strong>Company:</strong> Krishik AI Services LLP
          <br />
          <strong>Address:</strong> 1/418-8-1, Opp. Maruthi Nagar, Near Anjaneya Swamy
          Temple, Mundy Bazar, Cuddapah, Andhra Pradesh – 516001, India
        </p>

        {/* 9. Summary */}
        <h2 className="text-2xl font-semibold mb-3">9. Privacy Summary (Quick Overview)</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <p>gatePass.ai, a <strong>smart AI-powered visitor management app</strong>, ensures: </p>
          <li>✅ Minimal data collection for security & community convenience</li>
          <li>✅ End-to-end encrypted, India-hosted data storage</li>
          <li>✅ No ad tracking, no third-party selling</li>
          <li>✅ Complete user control and data transparency</li>
          <li>
            ✅ Compliance with India’s{" "}
            <a
              href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              <strong>
              Digital Personal Data Protection Act (DPDP) 2023</strong>
            </a>
          </li>
        </ul>

        <p>
          By continuing to use <strong> gatePass.Ai</strong>, you acknowledge that you have read, understood,
          and agreed to this Privacy Policy.
        </p>
      </main>
      <Footer />
    </div>
  );
}
