"use client";

import { useState, useEffect } from "react";
import { CreditCard, CircleX, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "../utils/supabase";
import { motion } from "framer-motion";

const tabs = [
  { name: "Total Paid", icon: CreditCard },
  { name: "Total Unpaid", icon: CircleX },
  { name: "With Penalty", icon: AlertTriangle },
  { name: "Without Penalty", icon: CheckCircle },
];

interface PaymentRecord {
  society_id: string;
  paid_months: any[];
}

export default function Payments() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const society_id = "A_MC2_BLR_102";

  // Fetch Payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("payment_details")
        .select("society_id, paid_months")
        .eq("society_id", society_id);

      if (error) throw error;
      setPayments(data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Calculate counts
  const getCounts = () => {
    let totalPaid = 0;
    let totalUnpaid = 0;
    let withPenalty = 0;
    let withoutPenalty = 0;

    payments.forEach((record) => {
      const months = record.paid_months || [];
      if (months.length === 0) {
        totalUnpaid += 1;
      } else {
        totalPaid += 1;
        months.forEach((m: any) => {
          if (m.penalty && m.penalty > 0) withPenalty++;
          else withoutPenalty++;
        });
      }
    });

    return { totalPaid, totalUnpaid, withPenalty, withoutPenalty };
  };

  const counts = getCounts();

  const getPopupText = () => {
    if (activeTab === "Total Paid")
      return loading ? "Loading..." : `Total Paid: ${counts.totalPaid}`;
    if (activeTab === "Total Unpaid")
      return loading ? "Loading..." : `Total Unpaid: ${counts.totalUnpaid}`;
    if (activeTab === "With Penalty")
      return loading ? "Loading..." : `With Penalty: ${counts.withPenalty}`;
    if (activeTab === "Without Penalty")
      return loading ? "Loading..." :` Without Penalty: ${counts.withoutPenalty}`;
    return "";
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">
          Payment Management System
        </h1>
      </motion.div>

      {/*  Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="cursor-pointer p-10 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col items-center justify-center"
          >
            <div className="bg-[#28B8AE]/10 p-4 rounded-full mb-3">
              <tab.icon className="w-8 h-8 text-[#28B8AE]" />
            </div>
            <h2 className="text-md font-semibold text-gray-800">{tab.name}</h2>
          </div>
        ))}
      </div>

      {/*  Popup */}
      {activeTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-10 shadow-2xl relative">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-3xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#28B8AE]">
              {activeTab}
            </h2>

            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 mb-6 shadow-inner">
              <p className="text-gray-700 font-semibold">{getPopupText()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}