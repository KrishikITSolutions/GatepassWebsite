"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
        <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6">
          Welcome to <strong>gatePass.ai</strong>
        </p>
        <p className="mb-6">
          These Terms of Service (“Terms”) govern your use of our mobile application, website, and related services
          (collectively, the “Platform”). By accessing or using the Platform, you agree to these Terms. If you do not
          agree, please do not use the Platform.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">1. Definitions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>“User”</strong> refers to any individual or entity using GatePass.ai, including residents, guests,
            facility staff, security guards, RWAs, and administrators.
          </li>
          <li>
            <strong>“We,” “Us,” or “GatePass.ai”</strong> refers to the company operating the Platform.
          </li>
          <li>
            <strong>“Community”</strong> means a housing society, apartment complex, gated community, or similar
            residential entity onboarded onto GatePass.ai.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">2. Eligibility</h2>
        <p>
          To use the Platform, you must be:
          <br />– At least 18 years old and competent to contract under Indian law.
          <br />– Authorized by your Community or RWA, where applicable.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">3. User Account</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Users may need to register by providing accurate personal details.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>GatePass.ai is not liable for any loss or damage from unauthorized account use.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">4. Services Offered</h2>
        <p>
          GatePass.ai offers features including but not limited to:
          <br />
          – Visitor management<br />
          – Resident directories<br />
          – Daily help tracking<br />
          – Vehicle and delivery monitoring<br />
          – Intercom replacement and emergency alerting
        </p>
        <p className="mt-2">
          Features may evolve, and we reserve the right to add, modify, or remove features.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">5. Consent and Data Privacy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            By using the Platform, you consent to the collection, processing, and use of your personal data in
            accordance with our <a href="/privacypolicy" className="text-[#28B8AE] underline">Privacy Policy</a>.
          </li>
          <li>
            We comply with the <strong>DPDP Act, 2023</strong> and other applicable Indian data protection laws.
          </li>
          <li>
            RWAs and administrators are required to obtain valid user consent before uploading or linking
            resident/user information.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">6. User Obligations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Platform only for lawful purposes.</li>
          <li>Do not misuse, reverse-engineer, hack, or disrupt the Platform.</li>
          <li>Keep your profile data accurate and updated.</li>
        </ul>


        <h2 className="text-2xl font-bold mt-10 mb-3">7. Fees and Payments</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Certain features may be chargeable to Communities or users.</li>
          <li>Fees will be clearly communicated, and invoices may be shared with RWAs.</li>
          <li>No hidden charges will be levied without prior consent.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">8. Third-Party Services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We may integrate with third-party services (e.g., payment gateways, emergency contacts).</li>
          <li>GatePass.ai is not responsible for external service reliability or data use once redirected to third-party platforms.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">9. Termination</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>RWAs may request access revocation for a user within their community.</li>
          <li>Users may deactivate their account at any time through the app or by written request.</li>
          <li>We may suspend or terminate accounts that breach these Terms or applicable laws.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">10. No Resale of Service</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service for commercial purposes.</li>
          <li>GatePass.ai reserves the right to modify or discontinue the Service with notice. You may retain your data during this time, but GatePass.ai is not liable for any resulting damages.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">11. Disclaimer of Warranties and Limitation of Liability</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>GatePass.ai is provided on an “as is” and “as available” basis without warranties of any kind—express or implied.</li>
          <li>We do not guarantee uninterrupted, secure, or error-free operation of the Platform.</li>
          <li>Responsibility for obtaining consent for sharing resident data lies with the Direct Customer (e.g., RWA).</li>
          <li>We are not liable for any direct or indirect damages, including theft or breaches within premises.</li>
          <li>Our total liability is limited to the fees actually paid by you to us for the services in question.</li>
          <li>Nothing on the platform constitutes professional or legal advice.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">12. Indemnity</h2>
        <p className="mb-6">
          You agree to indemnify and hold harmless GatePass.ai and its affiliates from any claims, damages, or losses arising from your use or misuse of the Platform.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">13. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All content, branding, trademarks, and source code are property of GatePass.ai.</li>
          <li>You may not copy, distribute, or reuse any part of the Platform without express permission.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">14. Modifications</h2>
        <p className="mb-6">
          GatePass.ai reserves the right to modify these Terms at any time. Updated versions will be notified via the app or website and will take effect upon publication.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">15. Governing Law</h2>
        <p className="mb-6">
          These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Bengaluru, Karnataka.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">16. Contact Us</h2>
        <p className="mb-2">
          In case of any grievance arising from the use of the Platform, please contact the Grievance Officer:
        </p>
        <ul className="pl-6 space-y-2">
          <li><strong>Email:</strong> <a href="mailto:gatepassai@gmail.com" className="text-[#28B8AE] underline">gatepassai@gmail.com</a></li>
          <li><strong>Phone:</strong> 8331822131</li>
          <li><strong>Address:</strong> 1/418-8-1, Opp Maruthi Nagar, Near Anjaneya Swamy Temple, Mundy Bazar, Cuddapah, Andhra Pradesh, India, 516001</li>
        </ul>

        <p className="mt-6 italic">
          By continuing to use GatePass.ai, you acknowledge that you have read, understood, and agreed to these Terms.
        </p>

      </main>
      <Footer />
    </div>
  );
}
