import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
          About Us
        </h1>

        {/* Overview Section */}
        <section className="mb-8">
          <p>
            <strong>GatePass.AI</strong> is a next-generation community security and visitor 
            management app designed for modern apartments and gated communities. Our platform 
            uses AI-driven technology to make residential living safer, simpler, and more efficient. 
            From secure visitor approvals to multilingual support for residents, GatePass.AI delivers 
            a seamless experience for societies, residents, security staff, and property managers.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p>
            To become India’s most trusted AI-powered community security solution, connecting 
            residents and management through a secure, smart, and accessible digital ecosystem.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced visitor management and gate security</li>
            <li>Smooth resident–management communication</li>
            <li>Automated community workflows</li>
            <li>Mother-tongue and multilingual support for better accessibility</li>
            <li>A user-friendly interface that works for all age groups</li>
          </ul>
        </section>

        {/* Why GatePass.AI is Different */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Why GatePass.AI is Different</h2>
          <p className="mb-4">
            Unlike regular apartment security apps, GatePass.AI uses artificial intelligence 
            to understand user behaviour, speed up verifications, and reduce manual errors. 
            Our platform also focuses heavily on language accessibility, ensuring that even 
            non-tech users—including residents aged 35+ and above—can navigate the app comfortably.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Smart, AI-assisted visitor authentication</li>
            <li>Real-time notifications and community updates</li>
            <li>Easy complaint management and service request tracking</li>
            <li>Parcel and delivery management</li>
            <li>Tools for property managers to monitor, organize, and automate tasks</li>
          </ul>
        </section>

        {/* What We Stand For */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">What We Stand For</h2>
          <p>
            <strong>Security. Convenience. Transparency.</strong><br />
            We believe that every community deserves a secure and well-connected environment. 
            Our goal is to simplify daily interactions within residential societies and ensure 
            that every resident—from children to senior citizens—feels confident using our app.
          </p>
        </section>

        {/* Commitment */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
          <p>
            At GatePass.AI, we continuously innovate to bring the best AI-powered security 
            features to your community. Our team is dedicated to building a safe, inclusive, 
            and tech-friendly platform that improves the quality of life in every apartment 
            complex and gated community we serve.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
