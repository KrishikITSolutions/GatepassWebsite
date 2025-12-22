"use client";

import { useState, useEffect } from "react";
import DownloadButton from "@/components/download";
import { motion } from "framer-motion";
import { supabase } from "@/app/utils/supabase";
import SocietySelector from "@/components/societyselector";
import { Truck, User, Car, Users, Home } from "lucide-react";

// -------------------------------------------
// Types
// -------------------------------------------
interface VisitorEntry {
  id: number;
  society_id: string;
  member_name: string;
  guest_type: string;
  start_date: string;
  ride_company?: string;
  type?: string;
}

// -------------------------------------------
// Categories UI with icons
// -------------------------------------------
const categories = [
  { name: "Deliveries", icon: Truck },
  { name: "Visitors", icon: User },
  { name: "Cabs", icon: Car },
  { name: "Workers", icon: Users },
  { name: "Daily Help", icon: Home },
];

// -------------------------------------------
// Field mapping for downloads
// -------------------------------------------
const categoryFields: Record<string, string[]> = {
  Deliveries: ["member_name", "guest_type", "start_date", "ride_company", "type"],
  Visitors: ["member_name", "guest_type", "start_date"],
  Cabs: ["member_name", "guest_type", "start_date", "ride_company"],
  Workers: ["member_name", "guest_type", "start_date"],
  "Daily Help": ["member_name", "guest_type", "start_date", "ride_company", "type"],
};

export default function VisitorManagementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("1 Day");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [activeVisitorTab, setActiveVisitorTab] = useState<"preapproval" | "guardentries">("preapproval");
  const [visitorData, setVisitorData] = useState<VisitorEntry[]>([]);
  const [userRole, setUserRole] = useState<"admin" | "rwa" | null>(null);
  const [societyId, setSocietyId] = useState<string | null>(null);

  // -------------------------------------------
  // Fetch visitor data
  // -------------------------------------------
  const fetchFilteredData = async () => {
    if (!selectedCategory) return;
    if (!societyId && userRole === "rwa") return;

    try {
      const now = new Date();
      let startISO = "";
      let endISO = new Date().toISOString();

      // Date filter
      switch (filterType) {
        case "1 Day":
          startISO = new Date(now.setHours(0, 0, 0, 0)).toISOString();
          break;
        case "7 Days":
          startISO = new Date(now.setDate(now.getDate() - 6)).toISOString();
          break;
        case "30 Days":
          startISO = new Date(now.setDate(now.getDate() - 29)).toISOString();
          break;
        case "Custom":
          if (!customStart || !customEnd) return;
          startISO = new Date(customStart).toISOString();
          endISO = new Date(customEnd).toISOString();
          break;
      }

      const mapping: Record<string, string> = {
        Deliveries: "delivery",
        Visitors: "visitor",
        Cabs: "cab",
        Workers: "workers",
        "Daily Help": "dailyhelp",
      };

      let query = supabase.from("visitors_enrtries").select("*");

      // Society filter: skip if "ALL" is selected
      if (societyId && societyId !== "ALL") {
        query = query.eq("society_id", societyId);
      }

      query = query.gte("start_date", startISO).lte("start_date", endISO);

      // Guest type
      if (selectedCategory === "Visitors") {
        query = query.eq("guest_type", activeVisitorTab === "preapproval" ? "guest" : "visitor");
      } else {
        query = query.eq("guest_type", mapping[selectedCategory]);
      }

      const { data, error } = await query;
      if (error) throw error;

      setVisitorData(data || []);
      setTotalEntries(data?.length || 0);
    } catch (err) {
      console.error("Error fetching visitor data:", err);
    }
  };

  // -------------------------------------------
  // Initialize user role and default society
  // -------------------------------------------
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) return;

    const user = JSON.parse(raw);
    setUserRole(user.role);

    if (user.role === "rwa") {
      setSocietyId(user.society_id);
    } else if (user.role === "admin") {
      setSocietyId("ALL"); // default to All Societies
    }
  }, []);

  // Fetch when category or filters change
  useEffect(() => {
    if (selectedCategory && societyId) {
      fetchFilteredData();
    }
  }, [selectedCategory, filterType, customStart, customEnd, activeVisitorTab, societyId]);

  // -------------------------------------------
  // UI
  // -------------------------------------------
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-tight text-gray-800 text-center"
      >
        Visitor Management System
      </motion.h1>

      {/* Society Selector for Admin */}
      {userRole === "admin" && (
        <div className="flex justify-center mt-6">
          <SocietySelector
            value={societyId}
            onChange={(id) => {
              setSocietyId(id);
              setSelectedCategory(null);
              setVisitorData([]);
              setTotalEntries(0);
            }}
          />
        </div>
      )}

      {userRole === "admin" && !societyId && (
        <p className="text-center mt-6 text-gray-500">
          Please select a society to view data
        </p>
      )}

      {/* Category Cards - Residents Style with icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              if (userRole === "admin" && !societyId) {
                alert("Please select a society first");
                return;
              }
              setSelectedCategory(cat.name);
              setFilterType("1 Day");
              setCustomStart("");
              setCustomEnd("");
              setActiveVisitorTab("preapproval");
            }}
            className="cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center bg-white"
          >
            {/* Icon */}
            <div className="p-4 rounded-full mb-3 bg-gray-100 flex items-center justify-center w-16 h-16">
              <cat.icon className="text-teal-600" size={28} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
          </div>
        ))}
      </div>

      {/* Popup Modal - untouched */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 text-gray-600 text-3xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{selectedCategory}</h2>

            {/* Visitor Tabs */}
            {selectedCategory === "Visitors" && (
              <div className="flex justify-center gap-4 mb-6">
                <button
                  className={`px-5 py-2 rounded-full shadow transition ${activeVisitorTab === "preapproval"
                    ? "bg-[#28B8AE] text-white"
                    : "bg-gray-100 text-gray-600"
                    }`}
                  onClick={() => setActiveVisitorTab("preapproval")}
                >
                  Pre-Approval
                </button>

                <button
                  className={`px-5 py-2 rounded-full shadow transition ${activeVisitorTab === "guardentries"
                    ? "bg-[#28B8AE] text-white"
                    : "bg-gray-100 text-gray-600"
                    }`}
                  onClick={() => setActiveVisitorTab("guardentries")}
                >
                  Guard Entries
                </button>
              </div>
            )}

            {/* Filters */}
            <select
              className="w-full border rounded-full p-3 mb-4"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="1 Day">1 Day</option>
              <option value="7 Days">7 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="Custom">Custom</option>
            </select>

            {/* Custom Date Range */}
            {filterType === "Custom" && (
              <div className="flex gap-4 mb-4">
                <input type="date" className="w-1/2 border rounded p-2" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
                <input type="date" className="w-1/2 border rounded p-2" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
                <button className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={fetchFilteredData}>Apply</button>
              </div>
            )}

            {/* Total Count */}
            <div className="text-center py-6 bg-gray-50 border rounded-xl mb-6 shadow-inner">
              <p className="text-gray-700 font-semibold">
                Total {selectedCategory} entries{" "}
                <span className="text-[#28B8AE]">{totalEntries}</span>
              </p>
            </div>

            {/* Download */}
            <div className="flex justify-end">
              <DownloadButton
                data={visitorData.map((v) => ({
                  Name: v.member_name,
                  Type: v.guest_type,
                  Date: new Date(v.start_date).toLocaleDateString("en-GB"),
                }))}
                fileName={`${selectedCategory}-export`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
