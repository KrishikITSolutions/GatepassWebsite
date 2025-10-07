"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

// This component shows a table of resident profiles
export default function PaymentsSection() {
  // -------------------------------
  // State for search input
  // -------------------------------
  const [search, setSearch] = useState("");

  // -------------------------------
  // Sample resident data
  // In real apps, you can fetch this from Supabase or any API
  // -------------------------------
  const data = [
    { name: "John Doe", flat: "A-101", contact: "+91 98765 43210", email: "john@example.com"  },
    { name: "Jane Smith", flat: "B-204", contact: "+91 91234 56789", email: "jane@example.com" },
    { name: "Rajesh Kumar", flat: "C-307", contact: "+91 99887 66554", email: "rajesh@example.com" },
  ];

  // -------------------------------
  // Filter residents based on search input
  // -------------------------------
  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.flat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // -------------------------------
    // Main container with background, padding, min height, and smooth vertical scrolling
    // -------------------------------
    <div className="bg-gray-50 rounded-xl p-6 min-h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth">
      
      {/* -------------------------------
          Page Heading
      ------------------------------- */}
      <h1 className="text-2xl font-bold mb-2">🏘️ Resident Profiles</h1>
      <p className="text-gray-600 mb-4">Overview of all registered residents.</p>

      {/* -------------------------------
          Table Card Container
      ------------------------------- */}
      <div className="bg-white rounded-2xl shadow p-4">
        
        {/* -------------------------------
            Top Controls: Search + Add Button
        ------------------------------- */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <input
              value={search} // controlled input
              onChange={(e) => setSearch(e.target.value)} // update state on typing
              placeholder="Search by name or flat..."
              className="px-4 py-2 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-[#28B8AE]"
            />
          </div>

          {/* Add Resident Button */}
          <button className="flex items-center gap-2 bg-[#28B8AE] text-white px-4 py-2 rounded-full shadow">
            <FaUserPlus /> Add Resident
          </button>
        </div>

        {/* -------------------------------
            Table wrapper with horizontal scroll
        ------------------------------- */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#28B8AE]/10 text-[#28B8AE] uppercase text-sm font-semibold">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Flat</th>
                <th className="py-3 px-4">Contact</th>
                
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Email</th>
                
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700">
              {filtered.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4">{r.name}</td>
                  <td className="py-3 px-4">{r.flat}</td>
                  <td className="py-3 px-4">{r.contact}</td>
                  <td className="py-3 px-4">{r.email}</td>
                   <td className="py-3 px-4">{r.email}</td>
                    <td className="py-3 px-4">{r.email}</td>
                </tr>
              ))}

              {/* Display message if no results found */}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
