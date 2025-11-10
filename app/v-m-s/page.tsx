"use client";

import { useState, useEffect } from "react";
import { Truck, User, Car, Hammer, UserCheck } from "lucide-react";
import DownloadButton from "@/components/download";
import { supabase } from "../utils/supabase";
import { motion } from "framer-motion";

interface Visitor {
  id: number;
  society_id: string;
  member_name: string;
  guest_type: string;
  start_date: string;
  ride_company?: string;
  type?: string;
}

const categories = [
  { name: "Deliveries", icon: Truck, color: "bg-indigo-100", textColor: "text-indigo-600" },
  { name: "Visitors", icon: User, color: "bg-green-100", textColor: "text-green-600" },
  { name: "Cabs", icon: Car, color: "bg-yellow-100", textColor: "text-yellow-600" },
  { name: "Workers", icon: Hammer, color: "bg-pink-100", textColor: "text-pink-600" },
  { name: "Daily Help", icon: UserCheck, color: "bg-purple-100", textColor: "text-purple-600" },
];

// Fields for DownloadButton
const categoryFields: Record<string, string[]> = {
  Deliveries: ["member_name", "guest_type", "start_date", "ride_company", "type"],
  Visitors: ["member_name", "guest_type", "start_date"],
  Cabs: ["member_name", "guest_type", "start_date", "ride_company"],
  Workers: ["member_name", "guest_type", "start_date"],
  "Daily Help": ["member_name", "guest_type", "start_date", "ride_company", "type"],
};

export default function VisitorManagementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState("1 Day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"preapproval" | "guardentries">("preapproval"); // default tab
  const [categoryData, setCategoryData] = useState<Visitor[]>([]);

  // Fetch data dynamically based on filter
  const fetchCategoryData = async () => {
    if (!selectedCategory) return;

    try {
      const now = new Date();
      let startISO = "";
      let endISO = new Date().toISOString();

      if (filter === "1 Day") {
        startISO = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      } else if (filter === "7 Days") {
        startISO = new Date(now.setDate(now.getDate() - 6)).toISOString();
      } else if (filter === "30 Days") {
        startISO = new Date(now.setDate(now.getDate() - 29)).toISOString();
      } else if (filter === "Custom" && startDate && endDate) {
        startISO = new Date(startDate).toISOString();
        endISO = new Date(endDate).toISOString();
      } else {
        return;
      }

      const guestTypeMap: Record<string, string> = {
        Deliveries: "delivery",
        "Daily Help": "dailyhelp",
        Visitors: "visitor",
        Cabs: "cab",
        Workers: "workers",
      };

      let query = supabase
        .from("visitors_enrtries")
        .select("*")
        .eq("society_id", "A_DC0_BLR_01")
        .gte("start_date", startISO)
        .lte("start_date", endISO);

      if (selectedCategory === "Visitors") {
        if (activeTab === "preapproval") {
          query = query.eq("guest_type", "guest");
        } else if (activeTab === "guardentries") {
          query = query.eq("guest_type", "visitor");
        }
      } else {
        const guestType = guestTypeMap[selectedCategory] || selectedCategory.toLowerCase();
        query = query.eq("guest_type", guestType);
      }

      const { data, error } = await query;

      if (error) throw error;

      setCategoryData(data || []);
      setTotalEntries(data?.length || 0);
    } catch (err) {
      console.error("Error fetching category data:", err);
    }
  };

  useEffect(() => {
    if (selectedCategory) fetchCategoryData();
  }, [selectedCategory, filter, startDate, endDate, activeTab]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Visitor Management System
        </h1>
      
      </motion.div>
      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setFilter("1 Day");
              setStartDate("");
              setEndDate("");
              setActiveTab("preapproval");
            }}
            className="cursor-pointer p-8 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center justify-center"
          >
            <div className={`${cat.color} p-4 rounded-full mb-3`}>
              <cat.icon className={`w-10 h-10 ${cat.textColor}`} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 font-bold text-3xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{selectedCategory}</h2>

            {selectedCategory === "Visitors" && (
              <div className="flex justify-center gap-4 mb-6">
                <div
                  className="cursor-pointer p-4 rounded-full shadow hover:shadow-xl transition flex-1 text-center"
                  onClick={() => setActiveTab("preapproval")}
                >
                  <span
                    className={`font-medium ${activeTab === "preapproval"
                        ? "text-white bg-[#28B8AE] hover:bg-[#219c93] px-5 py-2 rounded-full transition shadow-md"
                        : ""
                      }`}
                  >
                    Pre-Approval
                  </span>
                </div>
                <div
                  className="cursor-pointer p-4 rounded-full shadow hover:shadow-xl transition flex-1 text-center"
                  onClick={() => setActiveTab("guardentries")}
                >
                  <span
                    className={`font-medium ${activeTab === "guardentries"
                        ? "text-white bg-[#28B8AE] hover:bg-[#219c93] px-5 py-2 rounded-full transition shadow-md"
                        : ""
                      }`}
                  >
                    Guard Entries
                  </span>
                </div>
              </div>
            )}

            <select
              className="w-full border rounded-full p-3 mb-4"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="1 Day">1 Day</option>
              <option value="7 Days">7 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="Custom">Custom</option>
            </select>

            {filter === "Custom" && (
              <div className="flex gap-4 mb-4">
                <input
                  type="date"
                  className="w-1/2 border rounded p-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="w-1/2 border rounded p-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                  onClick={fetchCategoryData}
                >
                  Apply
                </button>
              </div>
            )}

            <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-200 mb-6 shadow-inner">
              {filter === "Custom" && (!startDate || !endDate) ? (
                <p className="text-gray-500 italic">Please select a valid custom date range.</p>
              ) : (
                <p className="text-gray-700 font-semibold">
                  Total {selectedCategory} entries{" "}
                  {selectedCategory === "Visitors"
                    ? activeTab === "preapproval"
                      ? "(Pre-Approval) "
                      : "(Guard Entries) "
                    : ""}
                  {filter === "1 Day" && "for today"}
                  {filter === "7 Days" && "for the last 7 days"}
                  {filter === "30 Days" && "for the last 30 days"}
                  {filter === "Custom" &&
                    `from ${new Date(startDate).toLocaleDateString("en-GB")} to ${new Date(
                      endDate
                    ).toLocaleDateString("en-GB")}`}{" "}
                  : <span className="text-[#28B8AE]">{totalEntries}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end">
              {/* Download Button */}
              <div className="flex justify-end">
                <DownloadButton
                  data={categoryData.map((item) => ({
                    Name: item.member_name,
                    Type: item.guest_type,
                    Date: new Date(item.start_date).toLocaleDateString("en-GB"),
                  }))}
                  fileName={`${selectedCategory || "data"}-export`}
                />
              </div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
}  