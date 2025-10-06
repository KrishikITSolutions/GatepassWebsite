"use client";

import { useState } from "react";
import { Building2, LogOut } from "lucide-react";

// Navbar component at top of dashboard
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const userEmail = "admin@happyhomes.com"; // hardcoded user email

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-3 rounded-b-xl border-b border-gray-200">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <div className="bg-green-100 p-2 rounded-lg border border-green-400">
          <Building2 className="w-6 h-6 text-green-600" />
        </div>
        Admin Portal
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          className="w-9 h-9 rounded-full cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
            <div className="px-4 py-2 text-sm text-gray-700">{userEmail}</div>
            <hr />
            <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 text-sm text-red-600">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
