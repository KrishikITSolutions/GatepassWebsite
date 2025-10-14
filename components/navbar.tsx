"use client";

import { useState } from "react";
import { LogOut, ChevronDown } from "lucide-react"; // Chevron icon for better dropdown indicator
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png"; // Your logo

// Navbar with profile dropdown
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const userEmail = "admin@happyhomes.com";
  const societyName = "Marco Homes"; // (static for now)

  /*
    
    SUPABASE NOTE (for future)
    
    - Import supabase: import { supabase } from "@/integrations/supabase/client";
    - Use useEffect() to fetch data, then call setSocietyName(data.name);
    - Replace the static const with:
        const [societyName, setSocietyName] = useState("");
  */

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* LEFT SIDE: Logo + Society name */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" aria-label="Go to home" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="GatePass Logo"
              width={42}
              height={42}
              className="rounded-md cursor-pointer"
              priority
            />
          </Link>

          {/* Welcome message */}
          <div>
            <h1 className="text-lg font-semibold text-gray-800 leading-tight">
              Welcome to{" "}
              <span className="text-blue-600">{societyName}</span> Society!!
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Smart Living, Simplified</p>
          </div>
        </div>

        {/* RIGHT SIDE: Profile Section */}
        <div className="relative">
          {/* Profile button (image + arrow) */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{userEmail}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-50 text-sm text-red-600 transition">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
