"use client";

import { useState } from "react";
import { Truck, User, Car, Hammer, UserCheck } from "lucide-react";
import DownloadButton from "@/components/download";

// Categories
const categories = [
  { name: "Deliveries", icon: Truck, color: "bg-indigo-100", textColor: "text-indigo-600" },
  { name: "Visitors", icon: User, color: "bg-green-100", textColor: "text-green-600" },
  { name: "Cabs", icon: Car, color: "bg-yellow-100", textColor: "text-yellow-600" },
  { name: "Workers", icon: Hammer, color: "bg-pink-100", textColor: "text-pink-600" },
  { name: "Daily Help", icon: UserCheck, color: "bg-purple-100", textColor: "text-purple-600" },
];

// Fields for DownloadButton
const categoryFields: Record<string, string[]> = {
  Deliveries: ["name", "date", "time", "flat", "type"],
  Visitors: ["name", "flat", "phone"],
  Cabs: ["cabNo", "driver", "time"],
  Workers: ["name", "job", "shift", "time"],
  "Daily Help": ["name", "job", "shift", "time"],
};

export default function VisitorManagementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preapproval" | "guardentries" | null>(null);
  const [filter, setFilter] = useState("1 Day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle download
  const handleDownload = (fields: string[]) => {
    alert(`${selectedCategory} PDF downloaded with fields: ${fields.join(", ")}`);
  };

  // Random total entries calculation
  const totalEntries = Math.floor(Math.random() * 200 + 20);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Visitor Management System</h1>

      {/* Category Cards (3 in first row, 2 in second row) */}
      <div className="grid grid-cols-1 p- sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setActiveTab(null);
              setFilter("1 Day");
              setStartDate("");
              setEndDate("");
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
            {/* Close button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 font-bold text-3xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {selectedCategory}
            </h2>



            {/* Filter section */}
            {/* Tabs only for Visitors */}
            {selectedCategory === "Visitors" && (
              <div className="flex justify-center gap-4 mb-6">
                <div
                  className="cursor-pointer p-4 rounded-full shadow hover:shadow-xl transition flex-1 text-center"
                  onClick={() => setActiveTab("preapproval")}
                >
                  <span
                    className={`font-medium $
          activeTab === "preapproval" ? "text-white bg-[#28B8AE] hover:bg-[#219c93] text-white px-5 py-2 rounded-full transition shadow-md`}
                  >
                    Pre-Approval
                  </span>
                </div>
                <div
                  className="cursor-pointer p-4 rounded-full shadow hover:shadow-xl transition flex-1 text-center"
                  onClick={() => setActiveTab("guardentries")}
                >
                  <span
                    className={`font-medium $
          activeTab === "guardentries" ? "text-white bg-[#28B8AE] hover:bg-[#219c93] text-white px-5 py-2 rounded-full transition shadow-md`}
                  >
                    Guard Entries
                  </span>
                </div>
              </div>
            )}

            {/* Filter popup */}
            {(selectedCategory !== "Visitors" || activeTab) && (
              <div className="cursor-pointer p-8 rounded-2xl shadow hover:shadow-xl transition bg-white">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700 font-medium">
                    {selectedCategory !== "Visitors"
                      ? "Filter Entries"
                      : activeTab === "preapproval"
                        ? "Filter Pre-Approval"
                        : "Filter Guard Entries"}
                  </p>
                  {selectedCategory === "Visitors" && (
                    <button
                      className="text-gray-500 hover:text-gray-700 font-bold"
                      onClick={() => setActiveTab(null)}
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter select */}
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
                  </div>
                )}

                {/* Total entries */}
                <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-200 mb-6 shadow-inner">
                  {(() => {
                    const total = Math.floor(Math.random() * 200 + 20); // random simulated total
                    const formattedStart = startDate
                      ? new Date(startDate).toLocaleDateString("en-GB")
                      : "";
                    const formattedEnd = endDate
                      ? new Date(endDate).toLocaleDateString("en-GB")
                      : "";

                    switch (filter) {
                      case "1 Day":
                        return (
                          <p className="text-gray-700 font-semibold">
                            Total {selectedCategory} entries for today:{" "}
                            <span className="text-[#28B8AE]">{total}</span>
                          </p>
                        );

                      case "7 Days":
                        return (
                          <p className="text-gray-700 font-semibold">
                            Total {selectedCategory} entries for the last 7 days:{" "}
                            <span className="text-[#28B8AE]">{total}</span>
                          </p>
                        );

                      case "30 Days":
                        return (
                          <p className="text-gray-700 font-semibold">
                            Total {selectedCategory} entries for the last 30 days:{" "}
                            <span className="text-[#28B8AE]">{total}</span>
                          </p>
                        );

                      case "Custom":
                        if (startDate && endDate) {
                          return (
                            <p className="text-gray-700 font-semibold"> 
                              Total {selectedCategory} entries from{" "}
                              <span className="font-semibold">{formattedStart}</span> to{" "}
                              <span className="font-semibold">{formattedEnd}</span>:{" "}
                              <span className="text-[#28B8AE]">{total}</span>
                            </p>
                          );
                        } else {
                          return (
                            <p className="text-gray-500 italic">
                              Please select a valid custom date range.
                            </p>
                          );
                        }

                      default:
                        return null;
                    }
                  })()}
                </div>


                {/* Download button */}
                <div className="flex justify-end">
                  <DownloadButton
                    category={selectedCategory}
                    onDownload={() => alert(`Downloaded ${selectedCategory} PDF`)}
                  />
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
