"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { CreditCard, CircleX, AlertTriangle, CheckCircle, Download } from "lucide-react";

// TABS
const tabs = [
  { name: "Total Paid", icon: CreditCard },
  { name: "Total Unpaid", icon: CircleX },
  { name: "With Penalty Paid", icon: AlertTriangle },
  { name: "Without Penalty Paid", icon: CheckCircle },
];
console.log("Tabs:", tabs);
export default function Payments() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const society_id = "A_DC0_BLR_01";

  // ---------------------------------------------------
  // FETCH AND CLEAN DATA
  // ---------------------------------------------------
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);

    try {
      // ❗DO NOT FILTER BY DATE IN SUPABASE (because paid_months is an array)
      const { data, error } = await supabase
        .from("payment_details")
        .select("paid_months")
        .eq("society_id", society_id);

      if (error) throw error;

      // Flatten data + date filtering
      const cleaned = data.flatMap((row) =>
        ((row.paid_months || []) as any[])
          .filter((pm: any) => {
            if (!pm.payment_date) return false; // skip invalid entries

            const dt = new Date(pm.payment_date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && dt < start) return false;
            if (end && dt > end) return false;

            return true;
          })
          .map((pm: any) => ({
            month: pm.month?.toLowerCase(),
            year: pm.year,
            amount_paid: pm.amount || 0,
            penalty_paid: pm.penalty || 0,
            total_paid: pm.total_paid,
            payment_date: pm.payment_date,
            transaction_id: pm.transaction_id,
          }))
      );

      setPayments(cleaned);
    } catch (err) {
      console.error(err);
      setPayments([]);
    }

    setLoading(false);
  };

  // ---------------------------------------------------
  // FILTERED DATA BASED ON TAB
  // ---------------------------------------------------
 const getFilteredData = () => {
  let list = [...payments];

  // -------- DATE FILTER LOGIC ----------
  if (startDate) {
    const from = new Date(startDate);
    list = list.filter((p) => p.payment_date && new Date(p.payment_date) >= from);
  }

  if (endDate) {
    const to = new Date(endDate);
    list = list.filter((p) => p.payment_date && new Date(p.payment_date) <= to);
  }

  // -------- TAB LOGIC ----------
  switch (activeTab) {
    case "Total Paid":
      return list.filter((p) => p.amount_paid > 0);

    case "With Penalty Paid":
      return list.filter((p) => p.penalty_paid > 0);

    case "Without Penalty Paid":
      return list.filter((p) => p.amount_paid > 0 && p.penalty_paid === 0);

    case "Total Unpaid":
      return getUnpaidMonths(list);

    default:
      return list;
  }
};

  // ---------------------------------------------------
  // UNPAID MONTHS LOGIC
  // ---------------------------------------------------
  const getUnpaidMonths = (paidList: any[]) => {
    const months = [
      "january","february","march","april","may","june",
      "july","august","september","october","november","december"
    ];

    const year = new Date().getFullYear();
    const paidSet = new Set(paidList.map((p) => `${p.month}-${p.year}`));

    const currentMonthIndex = new Date().getMonth();

    const result = [];

    for (let i = 0; i <= currentMonthIndex; i++) {
      const m = months[i];
      if (!paidSet.has(`${m}-${year}`)) {
        result.push({ month: m, year });
      }
    }

    return result;
  };

  // ---------------------------------------------------
  // DOWNLOAD CSV
  // ---------------------------------------------------
  const downloadCSV = () => {
    const data = getFilteredData();
    if (data.length === 0) return alert("No data available");

    const header = ["Month", "Year", "Amount", "Penalty", "Payment Date"];
    const rows = data.map((p) => [
      p.month,
      p.year,
      p.amount_paid,
      p.penalty_paid,
      p.payment_date || "-",
    ]);

    const csvContent = [header, ...rows]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}.csv`;
    a.click();
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
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
            onClick={() => {
              setActiveTab(tab.name);
              loadPayments(); // reload with filters
            }}
            className="cursor-pointer p-8 rounded-2xl bg-white shadow hover:scale-[1.02] transition flex flex-col items-center"
          >
            <div className="bg-[#28B8AE]/10 p-4 rounded-full mb-3">
              <tab.icon className="w-8 h-8 text-[#28B8AE]" />
            </div>
            <h2 className="text-md font-semibold">{tab.name}</h2>
          </div>
        ))}
      </div>

      {/* Popup */}
      {activeTab && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">{activeTab}</h2>

            {/* Filters */}
            <div className="bg-gray-50 border p-6 rounded-2xl shadow-inner">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label>From</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-between">
                  <label>To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                </div>
              </div>

              <button
                onClick={downloadCSV}
                className="mt-5 w-full bg-[#28B8AE] text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Download size={18} /> Download CSV
              </button>
            </div>
       
            {/* Record Count */}
            <p className="text-center mt-4 font-semibold text-gray-700">
              {getFilteredData().length} records found
            </p>
            
          </div>
        </div>
      )}
    </div>
  );
}
