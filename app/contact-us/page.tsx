
import Header from "@/components/header";
import Footer from "@/components/footer";

import ReactGA from "react-ga4";
import React, {useEffect} from "react";

ReactGA.initialize("G-BL9LQDSL3V");

export default function ContactUs() {

  useEffect(() => {
   ReactGA.send({ hitType: "pageview", page: "/contact-us", title: "ContactUs" });  
 });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-0 py-10 text-gray-800 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-lg mb-6">
          Thank you for using <strong>GatePass</strong>. If you have any questions,
          issues, or suggestions, please feel free to reach out to us. Our support
          team and RWA administrators are here to help you.
        </p>

        {/* Contact Information */}
        <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
        <p className="mb-4">
          You can contact us through the following channels:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
            <strong>Company:</strong> Krishik Ai Services LLP
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:gatepassai@gmail.com" className="text-blue-600 underline">
              gatepassai@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+918331822131" className="text-blue-600 underline">
              +91 8331822131
            </a>
          </li>
          
          <li>
            <strong>Address:</strong> 1/418-8-1, Opp Maruthi Nagar, Near Anjaneya Swamy Temple,
            Mundy Bazar, Cuddapah, Andhra Pradesh, India, 516001
          </li>
        </ul>

        {/* Contact Form */}
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Your Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows={5}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
