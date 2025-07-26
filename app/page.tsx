"use client"
import Image from 'next/image';
import logo from "../assets/logo.png"
import Footer from '@/components/footer';
import brochureFront from "../assets/gp2.png"
import brochureBack from "../assets/gp1.png"
import { useState } from 'react';

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-16 py-4 shadow-sm bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-4 cursor-pointer">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 text-gray-600 text-base font-medium ml-[600px]">
          <a href="#" className="text-lg hover:text-[#28B8AE] transition-colors duration-200">About us</a>
          <a href="#" className="text-lg hover:text-[#28B8AE] transition-colors duration-200">Services</a>
          <a href="#" className="text-lg hover:text-[#28B8AE] transition-colors duration-200">Contact us</a>
        </nav>

        {/* Book a Demo - Desktop */}
        <div className="hidden md:block">
          <button className="bg-[#28B8AE] hover:bg-[#239b96] text-white px-5 py-2 rounded-lg font-semibold shadow transition">
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow">
          <a href="#" className="block text-gray-700 hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>About us</a>
          <a href="#" className="block text-gray-700 hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#" className="block text-gray-700 hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>Contact us</a>
          <button className="w-full bg-[#28B8AE] hover:bg-[#239b96] text-white px-4 py-2 rounded-lg font-semibold shadow transition">
            Book a Demo
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-4 md:px-20 flex flex-col md:flex-row items-start justify-between py-16 gap-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-green-800">AI</span>-powered community management system
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Where Community Safety Meets Artificial Intelligence
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md text-lg shadow hover:bg-indigo-700">
            Start creating free
          </button>

          {/* YouTube Embed */}
          
          <div className="mt-10 flex justify-center md:justify-start w-full">
  <div className="relative w-full pb-[56.25%] rounded-lg shadow-md overflow-hidden max-w-xl">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/M25FHi7vpHI?si=OaLNva9SqNVXiacv"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>



        </div>

        {/* Right Side - Brochure Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <Image
            src={brochureBack}
            alt="Frontend Brochure"
            width={500}
            height={500}
            className="rounded-lg shadow-md w-full object-contain"
          />
          <Image
            src={brochureFront}
            alt="Backend Brochure"
            width={500}
            height={500}
            className="rounded-lg shadow-md w-full object-contain"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
