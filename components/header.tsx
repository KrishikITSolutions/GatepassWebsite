"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-16 py-4 shadow-sm bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" aria-label="Go to home">
            <Image
              src={logo}
              alt="GatePass Logo"
              width={60}
              height={60}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex flex-1 justify-center space-x-10 text-gray-700 text-lg font-medium">
          <Link href="/privacy-policy" className="hover:text-[#28B8AE] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/privacy-summary" className="hover:text-[#28B8AE] transition-colors">
            Privacy Summary
          </Link>
          <Link href="/terms-of-service" className="hover:text-[#28B8AE] transition-colors">
            Terms of Service
          </Link>
          <Link href="/terms-of-service-summary" className="hover:text-[#28B8AE] transition-colors">
            Terms Summary
          </Link>
          <Link href="/contact-us" className="hover:text-[#28B8AE] transition-colors">
            Contact Us
          </Link>
          <Link href="/refund-policy" className="hover:text-[#28B8AE] transition-colors">
            Refund Policy
          </Link>
          <Link href="/cancellation-policy" className="hover:text-[#28B8AE] transition-colors">
           Cancellation Policy
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-[#28B8AE] hover:bg-[#239b96] text-white px-4 py-2 rounded-md font-semibold shadow transition">
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // Cross icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                }
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-lg mx-4 mt-2 p-4 border border-gray-200 transition-all duration-300 space-y-3">
          <Link
            href="/privacy-policy"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Privacy Policy
          </Link>
          <Link
            href="/privacy-summary"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Privacy Summary
          </Link>
          <Link
            href="/terms-of-service"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Terms of Service
          </Link>
          <Link
            href="/terms-of-service-summary"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Terms Summary
          </Link>
           <Link
            href="/contact-us"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Contact Us
          </Link>
          <Link
            href="/Refund-policy"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Refund Policy
          </Link>
          <Link
            href="/cancellation-policy"
            className="block text-gray-800 font-medium px-2 py-2 rounded-md hover:bg-[#f0fdfa] hover:text-[#28B8AE] transition"
          >
            Cancellation Policy
          </Link>
          <button className="w-full bg-[#28B8AE] hover:bg-[#239b96] text-white font-semibold py-2 rounded-md transition">
            Book a Demo
          </button>
        </div>
      )}
    </>
  );
}
