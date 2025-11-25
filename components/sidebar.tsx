"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Home,
  Users2,
  CreditCard,
  Search,
  ChevronRight,
} from "lucide-react";
import { FaCreditCard, FaHome, FaUser } from "react-icons/fa";
import { FaLandmarkDome, FaLandMineOn } from "react-icons/fa6";

export default function Sidebar({ activePage, setActivePage }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: FaLandmarkDome },
    { name: "Residents", icon: FaUser},
    { name: "Payments", icon: FaCreditCard },
    { name: "V_M_S", icon:FaHome },
    {name:"Notifications", icon: FaHome},
  ];

  const filtered = menuItems.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      aria-label="Sidebar"
      className="fixed left-0 top-18 w-64 h-[calc(100vh-4rem)]
      bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-r-2xl border-r-1 border-t border-black p-5 flex flex-col p-5 z-40 transition-all duration-500"
    >
      {/*  Brand Header */}
      <div className="flex items-center gap-3 mb-8 select-none">
        <div className="flex items-center justify-center w-10 h-10 bg-[#28B8AE]/10 rounded-2xl shadow-md backdrop-blur-sm">
          <FaHome className="w-6 h-6 text-[#28B8AE]" />
        </div>
        <span className="text-xl font-bold text-[#28B8AE] tracking-tight drop-shadow-sm">
          Dashboard
        </span>
      </div>

      {/*  Search Input */}
      <div className="mb-5 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search menu..."
          className="w-full pl-10 pr-3 py-2 text-base border border-gray-200 rounded-full 
          focus:outline-none focus:ring-2 focus:ring-[#28B8AE]/40 focus:border-[#28B8AE]/50
          bg-white/70 backdrop-blur-sm shadow-sm transition-all placeholder-gray-400"
        />
      </div>

      {/*  Menu Items */}
      <nav className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {filtered.map(({ name, icon: Icon }) => {
          const isActive = activePage === name;
          return (
            <button
              key={name}
              onClick={() => setActivePage(name)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-full text-base font-semibold group
              transition-all duration-300 relative overflow-hidden
              ${
                isActive
                  ? "bg-gradient-to-r from-[#28B8AE]/20 to-[#28B8AE]/10 text-[#0f766e] border-l-4 border-[#28B8AE]"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#028f86]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive
                        ? "text-[#28B8AE]"
                        : "text-gray-500 group-hover:text-[#28B8AE]"
                    }`}
                  />
                </div>
                <span className="truncate font-semibold">{name}</span>
              </div>

              {isActive && (
                <ChevronRight className="w-5 h-5 text-[#28B8AE] animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/*  Footer */}
      <div className="pt-4 mt-4 border-t border-gray-100 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Happy Homes
      </div>
    </aside>
  );
}
