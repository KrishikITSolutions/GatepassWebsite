"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { CreditCard, CircleX, AlertTriangle, CheckCircle, Download } from "lucide-react";

const tabs = [
  { name: "Total Paid", icon: CreditCard },
  { name: "Total Unpaid", icon: CircleX },
  { name: "With Penalty Paid", icon: AlertTriangle },
  { name: "Without Penalty Paid", icon: CheckCircle },
];

export default function Payments() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const society_id = "A_DC0_BLR_01";

  // =============================
  // Fetch Data
  // =============================
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("payment_details")
        .select("society_id, paid_months")
        .eq("society_id", society_id);

      if (error) throw error;

      const combined = data.flatMap((r) => r.paid_months || []);
      setAllPayments(combined);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setAllPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Filter Logic
  // =============================
  const getFilteredData = () => {
    let filtered = allPayments;

    // date filter
    if (startDate)
      filtered = filtered.filter(
        (p) => new Date(p.payment_date) >= new Date(startDate)
      );
    if (endDate)
      filtered = filtered.filter(
        (p) => new Date(p.payment_date) <= new Date(endDate)
      );

    switch (activeTab) {
      case "Total Paid":
        return filtered.filter((p) => p.amount_paid > 0);
      case "With Penalty Paid":
        return filtered.filter((p) => p.penalty_paid && p.penalty_paid > 0);
      case "Without Penalty Paid":
        return filtered.filter((p) => !p.penalty_paid || p.penalty_paid === 0);
      case "Total Unpaid":
        return getUnpaidMonths(filtered);
      default:
        return filtered;
    }
  };

  const getUnpaidMonths = (paidData: any[]) => {
    const allMonths = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december",
    ];

    const currentYear = new Date().getFullYear();
    const paidMap = new Set(paidData.map((p) => `${p.year}-${p.month?.toLowerCase()}`));

    const unpaid: any[] = [];
    const currentMonth = new Date().getMonth();
    for (let i = 0; i <= currentMonth; i++) {
      const m = allMonths[i];
      if (!paidMap.has(`${currentYear}-${m}`)) {
        unpaid.push({ month: m, year: currentYear });
      }
    }
    return unpaid;
  };

  // =============================
  // Download Handlers
  // =============================
  const handleDownload = (type: string) => {
    const data = getFilteredData();
    if (data.length === 0) {
      alert("No data to download.");
      return;
    }
    if (type === "csv") exportCSV(data);
    else alert("PDF feature coming soon!");
  };

  const exportCSV = (data: any[]) => {
    const header = ["Month", "Year", "Amount", "Penalty", "Date"];
    const rows = data.map((d) => [
      d.month, d.year, d.amount_paid || "-", d.penalty_paid || "-", d.payment_date || "-",
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab || "payments"}.csv`;
    a.click();
  };

  // =============================
  // Render
  // =============================
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#28B8AE] mb-10">
        Payment Management
      </h1>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="cursor-pointer p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col items-center justify-center"
          >
            <div className="bg-[#28B8AE]/10 p-4 rounded-full mb-3">
              <tab.icon className="w-8 h-8 text-[#28B8AE]" />
            </div>
            <h2 className="text-md font-semibold text-gray-800">{tab.name}</h2>
          </div>
        ))}
      </div>

      {/* Popup */}
      {activeTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-3xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#28B8AE]">
              {activeTab}
            </h2>

            {/* Filters */}
            <div className="flex flex-col gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-gray-600 text-sm">From:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-gray-600 text-sm">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Download buttons */}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => handleDownload("csv")}
                  className="flex items-center gap-2 bg-[#28B8AE] text-white px-5 py-2 rounded-full shadow hover:bg-[#239e97]"
                >
                  <Download size={18} /> CSV
                </button>
                <button
                  onClick={() => handleDownload("pdf")}
                  className="flex items-center gap-2 bg-[#28B8AE] text-white px-5 py-2 rounded-full shadow hover:bg-[#239e97]"
                >
                  <Download size={18} /> PDF
                </button>
              </div>
            </div>

            {/* Summary info */}
            <div className="text-center mt-8">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <p className="text-gray-700 font-semibold">
                  {activeTab}: {getFilteredData().length} records found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
