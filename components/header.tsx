"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import logo from "../public/logo2.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobile-only submenu states )
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-16 py-4 shadow-sm bg-white sticky top-0 z-50">
        {/* ========= Logo + Brand Name ========= */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <Link href="/" aria-label="Go to home" className="flex items-center">
            <Image
              src={logo}
              alt="GatePass Logo"
              width={60}
              height={60}
              className="cursor-pointer"
              priority
            />
            <span className="text-3xl font-semibold text-[#28B8AE] tracking-wide relative top-[4px] ml-2">
              GatePass
            </span>
          </Link>
        </div>

        {/* ========= Center Menu ========= */}
        <div className="flex-1 flex justify-center hidden md:flex">
          <nav className="flex items-center space-x-10 font-semibold text-lg text-gray-700">
            <Link href="/" className="hover:text-[#28B8AE] transition-colors">
              Home
            </Link>

            {/* Services Dropdown*/}
            <div className="relative group flex items-center cursor-pointer">
              <span className="hover:text-[#28B8AE] transition-colors font-semibold flex items-center">
                Services <span className="ml-1 text-sm">&#9662;</span>
              </span>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/visitor-managment-system"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Visitor Management System
                </Link>
                <Link
                  href="/payments"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Payments
                </Link>
                <Link
                  href="/resident-welfare-association"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Resident Welfare Association
                </Link>
                <Link
                  href="/smart-daily-help"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Smart Daily Help & Visitor Alerts
                </Link>
                <Link
                  href="/instant-security-support"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Instant Security Support
                </Link>
              </div>
            </div>

            {/* About Us Dropdown*/}
            <div className="relative group flex items-center cursor-pointer">
              <span className="hover:text-[#28B8AE] transition-colors font-semibold flex items-center">
                About Us <span className="ml-1 text-sm">&#9662;</span>
              </span>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/privacy-policy"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/privacy-summary"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Privacy Summary
                </Link>
                <Link
                  href="/terms-of-service"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/terms-of-service-summary"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Terms Summary
                </Link>
                <Link
                  href="/refund-policy"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Refund Policy
                </Link>
                <Link
                  href="/cancellation-policy"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f0fdfa] hover:text-[#28B8AE]"
                >
                  Cancellation Policy
                </Link>
              </div>
            </div>

            <Link href="/" className="hover:text-[#28B8AE] transition-colors">
              Career
            </Link>
          </nav>
        </div>

        {/* ========= Right Actions  ========= */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Phone */}
          <Link
            href="/contact-us"
            aria-label="Contact Us"
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#28B8AE] hover:bg-[#239b96] transition cursor-pointer">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-700 text-lg">
              +91 8050996382
            </span>
          </Link>

          {/* Login */}
          <Link
            href="/welcome-page"
            className="border border-[#28B8AE] text-[#28B8AE] hover:bg-[#28B8AE] hover:text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Login
          </Link>

          {/* Book a Demo */}
          <Link href="/">
            <button className="px-5 py-2 bg-[#28B8AE] text-white font-semibold rounded-full shadow hover:bg-[#239b96] transition">
              Book a Demo
            </button>
          </Link>
        </div>

        {/* ========= Mobile Menu Button ========= */}
        <div className="md:hidden">
          <button
            aria-label="Toggle Menu"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen((prev) => !prev)}
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
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ========= Mobile Dropdown Menu  ========= */}
      {/* This block is md:hidden and will be visually hidden when isMenuOpen is false */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white shadow-md border-t border-gray-100 transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-3 font-semibold text-gray-700 text-base">
          {/* Home */}
          <Link
            href="/"
            className="hover:text-[#28B8AE]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {/* Services (mobile collapsible) */}
          <div>
            <button
              type="button"
              className="w-full flex justify-between items-center py-2 hover:text-[#28B8AE] focus:outline-none"
              onClick={() => setMobileServicesOpen((p) => !p)}
            >
              <span>Services</span>
              <span className={`transform transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            <div className={`${mobileServicesOpen ? "block" : "hidden"} ml-4 mt-2 space-y-2`}>
              <Link href="/visitor-managment-system" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Visitor Management System
              </Link>
              <Link href="/payments" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Payments
              </Link>
              <Link href="/resident-welfare-association" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Resident Welfare Association
              </Link>
              <Link href="/smart-daily-help" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Smart Daily Help & Visitor Alerts
              </Link>
              <Link href="/instant-security-support" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Instant Security Support
              </Link>
            </div>
          </div>

          {/* About Us (mobile collapsible) */}
          <div>
            <button
              type="button"
              className="w-full flex justify-between items-center py-2 hover:text-[#28B8AE] focus:outline-none"
              onClick={() => setMobileAboutOpen((p) => !p)}
            >
              <span>About Us</span>
              <span className={`transform transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            <div className={`${mobileAboutOpen ? "block" : "hidden"} ml-4 mt-2 space-y-2`}>
              <Link href="/privacy-policy" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Privacy Policy
              </Link>
              <Link href="/privacy-summary" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Privacy Summary
              </Link>
              <Link href="/terms-of-service" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Terms of Service
              </Link>
              <Link href="/terms-of-service-summary" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Terms Summary
              </Link>
              <Link href="/refund-policy" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Refund Policy
              </Link>
              <Link href="/cancellation-policy" className="block hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
                Cancellation Policy
              </Link>
            </div>
          </div>

          {/* Career */}
          <Link href="/" className="hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
            Career
          </Link>

          {/* Phone */}
          <Link href="/contact-us" className="flex items-center gap-2 hover:text-[#28B8AE]" onClick={() => setIsMenuOpen(false)}>
            <Phone className="w-4 h-4" /> +91 8050996382
          </Link>

          {/* Login */}
          <Link
            href="/"
            className="border border-[#28B8AE] text-[#28B8AE] hover:bg-[#28B8AE] hover:text-white px-4 py-2 rounded-md text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>

          {/* Book a Demo */}
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full bg-[#28B8AE] text-white py-2 rounded-md font-semibold hover:bg-[#239b96]">
              Book a Demo
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
}
