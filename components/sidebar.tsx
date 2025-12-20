
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { FaCreditCard, FaHome, FaUser } from "react-icons/fa";
import { FaLandmarkDome } from "react-icons/fa6";

export default function Sidebar({ activePage, setActivePage, role }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: FaLandmarkDome, path: "/dashboard" },
    { name: "Residents", icon: FaUser, path: "/dashboard/residents" },
    { name: "Payments", icon: FaCreditCard, path: "/dashboard/payments" },
    { name: "V_M_S", icon: FaHome, path: "/dashboard/visitor-management" },
    { name: "Notifications", icon: FaHome, path: "/dashboard/notifications", adminOnly: true },
  ];

  const filtered = menuItems
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((m) => !(m.adminOnly && role !== "admin"));

  return (
    <aside className="fixed left-0 top-18 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-r-2xl p-5 z-40">
      <div className="flex items-center gap-3 mb-8">
        <FaHome className="w-6 h-6 text-[#28B8AE]" />
        <span className="text-xl font-bold text-[#28B8AE]">Dashboard</span>
      </div>

      <div className="mb-5 relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search menu..."
          className="w-full pl-10 pr-3 py-2 border rounded-full"
        />
      </div>

      <nav className="space-y-2">
        {filtered.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path || pathname.startsWith(path + "/");
          return (
            <button
              key={name}
              onClick={() => {
                setActivePage(name);
                router.push(path);
              }}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-full ${
                isActive
                  ? "bg-[#28B8AE]/20 text-[#0f766e] border-l-4 border-[#28B8AE]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </div>
              {isActive && <ChevronRight className="w-5 h-5 text-[#28B8AE]" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
