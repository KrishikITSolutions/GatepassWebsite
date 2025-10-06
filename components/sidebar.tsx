"use client";

import { LayoutDashboard, Home, Users, CreditCard, Users2 } from "lucide-react";

// Sidebar with menu items
export default function Sidebar({ activePage, setActivePage }: any) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Flats", icon: Home },
    { name: "Workers", icon: Users },
    { name: "Payments", icon: CreditCard },
    { name: "Residents", icon: Users2 },
  ];

  return (
    <aside className="w-64 bg-white shadow-md rounded-xl border-t-2 border-r-2 border-gray-300 p-5 min-h-screen">
      {/* Optional search box */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-5 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-3">
        {menuItems.map(({ name, icon: Icon }) => (
          <li
            key={name}
            onClick={() => setActivePage(name)}
            className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activePage === name
                ? "bg-blue-100 text-blue-700 shadow-inner"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" /> {name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
