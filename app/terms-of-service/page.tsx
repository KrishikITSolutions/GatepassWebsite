"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main
        className="max-w-5xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          gatePass.Ai Terms and Conditions
        </h1>

        <p className="text-lg mb-6">
          <strong>Last Updated: October 2025</strong>
          <br />
          <br/>
          Welcome to <strong>GatePass.ai</strong> — an <strong>AI-powered digital gate pass and
          visitor management system</strong> that helps communities, apartments, and institutions
          manage visitors and materials securely and efficiently.
          <br />
          <br/>
          These <strong>Terms and Conditions (“Terms”)</strong> govern your use of the <strong>GatePass.ai app,
          website, and related services </strong>(collectively referred to as the “Platform”).
          <br />
          By accessing or using the Platform, you agree that you have read, understood, and
          accepted these Terms. 
          <br/>If you do not agree, please discontinue using <strong>GatePass.ai</strong> immediately.
        </p>

        {/* 1. Definitions */}
        <h2 className="text-2xl font-semibold mb-3">1. Definitions</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>User:</strong> Any individual or organization using<strong> GatePass.ai</strong>,
            including residents, visitors, security guards, facility staff, RWAs,
            administrators, or institutions.
          </li>
          <li>
            <strong>Community:</strong> Any housing society, school, office complex,
            factory, or organization registered on <strong>GatePass.ai</strong>.
          </li>
          <li>
            <strong>"We", "Us", "Our", or "GatePass.ai"</strong> Refers to the company operating
            and maintaining the<strong> GatePass.ai digital security and visitor management
            platform.</strong>
          </li>
        </ul>

        {/* 2. Eligibility */}
        <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <p>To use <strong>GatePass.ai</strong>, you must: </p>
          <li>Be at least 18 years of age and competent to contract under Indian law.</li>
          <li>
            Be authorized by your respective <strong>Community, Institution, or RWA</strong> where
            applicable.
          </li>
          <li>Ensure that children or junior residents use the app under adult supervision.</li>
          <li>
            If you access the Platform on behalf of an organization, you confirm that you
            have the authority to bind that entity to these Terms.
          </li>
        </ul>

        {/* 3. User Account */}
        <h2 className="text-2xl font-semibold mb-3">3. User Account</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Users may need to register and provide accurate personal details to use
            <strong> GatePass.ai</strong> features.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your login
            credentials and account information.
          </li>
          <li>Any activity under your account is your responsibility.</li>
          <li>
            <strong>GatePass.ai</strong> shall not be liable for any loss or damage caused by unauthorized
            account use.
          </li>
        </ul>

        {/* 4. Services */}
        <h2 className="text-2xl font-semibold mb-3">4. Services We Provide</h2>
        <p className="mb-3">
          <strong>GatePass.ai </strong>provides <strong> smart digital tools</strong> for visitor and material management
          within communities and institutions. Core features include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Digital visitor entry and approval system</li>
          <li>Resident and staff directories</li>
          <li>Daily help and attendance tracking</li>
          <li>Delivery and vehicle management</li>
          <li>Material / gate pass management for goods</li>
          <li>Emergency alerts and broadcast notifications</li>
        </ul>
        <p className="mb-6">
          Features may evolve over time — <strong>GatePass.ai</strong> may add, modify, or remove
          functionalities to enhance user experience and service quality.
        </p>

        {/* 5. Data Privacy */}
        <h2 className="text-2xl font-semibold mb-3">5. Data Privacy and Consent</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            We collect limited information such as name, phone number, flat/office ID,
            visitor details, and access logs solely for community security and operational
            management.
          </li>
          <li>
           <strong>GatePass.ai</strong> complies with India’s{" "}
            <a
              href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              <strong>Digital Personal Data Protection Act (DPDP) 2023</strong>
            </a>{" "}
            and other applicable data protection laws.
          </li>
          <li>
            Communities (RWAs, institutions) must obtain valid user consent before
            uploading or sharing data.
          </li>
          <li>
            You can control what information is visible to guards, admins, or other users.
          </li>
          <li>
            For full details, please review our{" "}
            <a href="/privacy-policy" className="text-blue-600 underline hover:text-blue-800">
              Privacy Policy
            </a>
            .
          </li>
        </ul>

        {/* 6. User Responsibilities */}
        <h2 className="text-2xl font-semibold mb-3">6. User Responsibilities</h2>
        <p className="mb-3">By using <strong>GatePass.ai</strong>, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Use the platform lawfully and responsibly.</li>
          <li>Keep your profile accurate and up to date.</li>
          <li>Not misuse, hack, reverse-engineer, or disrupt the app or its servers.</li>
          <li>
            Respect others’ privacy and avoid sharing personal data without permission.
          </li>
        </ul>
        <p className="mb-6">
          <strong>GatePass.ai </strong>reserves the right to suspend or terminate accounts that violate
          these responsibilities.
        </p>

        {/* 7. Fees */}
        <h2 className="text-2xl font-semibold mb-3">7. Fees and Payments</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Most features of <strong>GatePass.ai</strong> are free for residents and individual users.</li>
          <li>
            Premium features may be subscribed to by RWAs, corporates, or institutions.
          </li>
          <li>All charges will be transparent, with no hidden fees.</li>
          <li>
            Payments, where applicable, will follow standard invoice or digital gateway
            terms.
          </li>
        </ul>

        {/* 8. Third Party */}
        <h2 className="text-2xl font-semibold mb-3">8. Third-Party Services</h2>
        <p className="mb-6">
          <strong>GatePass.ai</strong> may integrate with trusted third-party providers (such as payment
          gateways, SMS APIs, or hardware integrations) to improve platform functionality.
          While we ensure secure integrations,<strong> GatePass.ai</strong> is not responsible for the
          privacy practices, reliability, or content of external platforms once you are
          redirected there. (Examples: Razorpay for payments, Twilio for communication,
          etc.)
        </p>

        {/* 9. Termination */}
        <h2 className="text-2xl font-semibold mb-3">
          9. Termination and Account Deactivation
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Users can deactivate their GatePass.ai accounts anytime via the app or by
            written request.
          </li>
          <li>
            RWAs or authorized administrators may revoke access within their communities.
          </li>
          <li>
            <strong>GatePass.ai</strong> may suspend or terminate accounts found in violation of these Terms
            or engaged in misuse.
          </li>
          <li>
            Upon termination, access will cease; however, limited data may be retained for
            legal or security reasons.
          </li>
        </ul>

        {/* 10. Prohibited Use */}
        <h2 className="text-2xl font-semibold mb-3">10. Prohibited Use and Resale</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Reproduce, duplicate, or resell any part of the <strong>GatePass.ai</strong> Platform for
            commercial gain without written consent.
          </li>
          <li>
            Misuse the Platform in a manner that affects its performance, users, or
            reputation.
          </li>
        </ul>
        <p className="mb-6">
          <strong>GatePass.ai</strong> reserves the right to modify, suspend, or discontinue services with
          prior notice. Users will have the option to retain or export their data before
          discontinuation.
        </p>

        {/* 11. Disclaimer */}
        <h2 className="text-2xl font-semibold mb-3">
          11. Disclaimer and Limitation of Liability
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            The <strong>GatePass.ai visitor management system</strong> is provided “as is” and “as
            available,” without express or implied warranties.
          </li>
          <li>We do not guarantee uninterrupted, secure, or error-free operation.</li>
          <li>Communities or administrators are responsible for obtaining user data consent.</li>
          <li>
           <strong> GatePass.ai</strong> shall not be liable for any indirect, incidental, or consequential
            damages (including thefts, misuse, or onsite incidents).
          </li>
          <li>
            Our maximum liability shall not exceed the total amount paid to <strong>GatePass.ai</strong> for
            the concerned service.
          </li>
          <li>Nothing on this Platform constitutes legal, professional, or security advice.</li>
        </ul>

        {/* 12. Indemnity */}
        <h2 className="text-2xl font-semibold mb-3">12. Indemnity</h2>
        <p className="mb-6">
          You agree to indemnify and hold harmless <strong>GatePass.ai</strong>, its employees, affiliates,
          and partners against claims, losses, or damages resulting from:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Your misuse of the Platform</li>
          <li>Violation of these Terms</li>
          <li>Infringement of others’ rights</li>
        </ul>

        {/* 13. Intellectual Property */}
        <h2 className="text-2xl font-semibold mb-3">13. Intellectual Property</h2>
        <p className="mb-6">
          <strong>All content, designs, trademarks, code, and logos</strong> within <strong>GatePass.ai</strong> are the
          exclusive property of the company. You may not copy, alter, or reuse any content
          without prior written consent.
        </p>

        {/* 14. Updates */}
        <h2 className="text-2xl font-semibold mb-3">14. Updates and Modifications</h2>
        <p className="mb-6">
          <strong>GatePass.ai</strong> may update these Terms periodically to reflect product or legal
          changes. Updates will be notified via the app or website, and will take effect
          once published. Continued use after updates signifies your acceptance of the
          revised Terms.
        </p>

        {/* 15. Governing Law */}
        <h2 className="text-2xl font-semibold mb-3">15. Governing Law and Jurisdiction</h2>
        <p className="mb-6">
          These Terms are governed by the laws of <strong>India</strong>. 
          <br/>
          Any disputes will be subject to
          the exclusive jurisdiction of the courts in <strong>Bengaluru, Karnataka</strong>.
        </p>

        {/* 16. Contact */}
        <h2 className="text-2xl font-semibold mb-3">16. Contact and Grievance Redressal</h2>
        <p className="mb-6">
          For any concerns, complaints, or data rights requests, contact our <strong>Grievance
          Officer:</strong>
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
          <strong>Address:</strong> 1/418-8-1, Opp. Maruthi Nagar, Near Anjaneya Swamy
          Temple, Mundy Bazar, Cuddapah, Andhra Pradesh – 516001
        </p>

        {/* Summary */}
        <h2 className="text-2xl font-semibold mb-3">Quick Summary (In-App Reference)</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>GatePass.ai</strong> collects only essential data to ensure safety and compliance with
            Indian data laws.
          </li>
          <li>Most features are free; premium features apply to enterprise or RWA accounts.</li>
          <li>You can delete your account anytime.</li>
          <li>Misuse or unauthorized data sharing can lead to suspension.</li>
          <li><strong>GatePass.ai</strong> is not liable for onsite incidents or local disputes.</li>
        </ul>

        <p>
          By continuing to use <strong>GatePass.ai</strong>, you confirm that you have read, understood, and
          accepted these Terms and Conditions.
        </p>
      </main>
      <Footer />
    </div>
  );
}
