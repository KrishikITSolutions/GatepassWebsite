"use client";

import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function Residents() {
  const [search, setSearch] = useState("");
  const data = [
    { name: "John Doe", flat: "A-101", contact: "+91 98765 43210", email: "john@example.com" },
    { name: "Jane Smith", flat: "B-204", contact: "+91 91234 56789", email: "jane@example.com" },
    { name: "Rajesh Kumar", flat: "C-307", contact: "+91 99887 66554", email: "rajesh@example.com" },
  ];

  const filtered = data.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.flat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 rounded-xl p-6 min-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-2">🏘️ Resident Profiles</h1>
      <p className="text-gray-600 mb-4">Overview of all registered residents.</p>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or flat..."
              className="px-4 py-2 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-[#28B8AE]"
            />
          </div>

          <button className="flex items-center gap-2 bg-[#28B8AE] text-white px-4 py-2 rounded-full shadow">
            <FaUserPlus /> Add Resident
          </button>
        </div>

        {/* horizontal scroll wrapper for wide tables */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-[#28B8AE]/10 text-[#28B8AE] uppercase text-sm font-semibold">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Flat</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filtered.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4">{r.name}</td>
                  <td className="py-3 px-4">{r.flat}</td>
                  <td className="py-3 px-4">{r.contact}</td>
                  <td className="py-3 px-4">{r.email}</td>
                </tr>
              ))}
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
