"use client";

import { useState } from "react";
import { LayoutDashboard, Home, Users, CreditCard, Users2, Search } from "lucide-react";
import { FaHome } from "react-icons/fa";

// Sidebar with menu items
export default function Sidebar({ activePage, setActivePage }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Residents", icon: Users2 },
     { name: "Payments", icon: CreditCard },
    { name: "V_M_S", icon: Home },
    
   
    
  ];

  const filtered = menuItems.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      className=" fixed left-0 top-18 w-64 h-[calc(100vh-4rem)] bg-white z-40 shadow-xl rounded-r-2xl border-r-1 border-t border-black p-5 flex flex-col"

      aria-label="Sidebar"
>
      {/* Title */}
        <div className="flex items-center space-x-2 mb-6">
    <FaHome className="w-8 h-5 text-[#28B8AE]" />
    <span className="text-lg font-bold text-[#28B8AE]">Dashboard</span>
  </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search menu..."
          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#28B8AE]"
        />
      </div>

      {/* Menu list (scroll inside sidebar) */}
      <nav className="flex-1 overflow-y-auto space-y-2 pr-1">
        {filtered.map(({ name, icon: Icon }) => {
          const isActive = activePage === name;
          return (
            <button
              key={name}
              onClick={() => setActivePage(name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition
                ${isActive ? "bg-[#28B8AE]/20 text-[#0f766e] border-l-4 border-[#28B8AE]" : "text-gray-700 hover:bg-gray-50 hover:text-[#028f86]"}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#28B8AE]" : "text-gray-500"}`} />
              <span className="truncate">{name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {/* <div className="pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500">
        © {new Date().getFullYear()} Happy Homes
      </div> */}
    </aside>
  );
}
