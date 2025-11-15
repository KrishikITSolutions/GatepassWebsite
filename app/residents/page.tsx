"use client";

import { useState, useEffect } from "react";
import { Users, Home, UserCheck, Shield, FileCheck } from "lucide-react";
import DownloadButton from "@/components/download";
import { supabase } from "../utils/supabase";
import { motion } from "framer-motion";

const tabs = [
  { name: "Owners", icon: Home },
  { name: "Tenants", icon: UserCheck },
  { name: "Total Residents", icon: Users },
  { name: "Guards", icon: Shield },
  { name: "Gatepass", icon: FileCheck },
];

interface Resident {
  id: number;
  first_name: string;
  flat_no: string;
  phone_number: string;
  user_type: string;
  society_id: string;
}

export default function Residents() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [guards, setGuards] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);

  const society_id = "A_DC0_BLR_01";

  //  Fetch Residents
  const fetchResidents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resident_profiles")
        .select("*")
        .eq("society_id", society_id)
        .eq("user_type", "user");
      if (error) throw error;
      setResidents(data || []);
    } catch (err) {
      console.error("Error fetching residents:", err);
      setResidents([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Guards
  const fetchGuards = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resident_profiles")
        .select("*")
        .eq("society_id", society_id)
        .eq("user_type", "guard");
      if (error) throw error;
      setGuards(data || []);
    } catch (err) {
      console.error("Error fetching guards:", err);
      setGuards([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Tab Change
  useEffect(() => {
    if (activeTab === "Total Residents") fetchResidents();
    if (activeTab === "Guards") fetchGuards();
  }, [activeTab]);

  // ✅ Dynamic popup text
  const getPopupText = () => {
    if (activeTab === "Owners") return "Total Owners: Coming Soon";
    if (activeTab === "Tenants") return "Total Tenants: Coming Soon";
    if (activeTab === "Total Residents")
      return loading ? "Loading..." : `Total Residents: ${residents.length}`;
    if (activeTab === "Guards")
      return loading ? "Loading..." : `Total Guards: ${guards.length}`;
    if (activeTab === "Gatepass") return "Gatepass details coming soon!";
    return "";
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
     <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">
          Resident Management System
        </h1>
      
      </motion.div>

      {/* ✅ Tab Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="cursor-pointer p-10 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col items-center justify-center"
          >
            <div className="bg-[#28B8AE]/10 p-4 rounded-full mb-3">
              <tab.icon className="w-8 h-8 text-[#28B8AE]" />
            </div>
            <h2 className="text-md font-semibold text-gray-800">
              {tab.name}
            </h2>
          </div>
        ))}
      </div>

      {/* ✅ Popup Modal */}
      {activeTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-30 shadow-2xl relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-3xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#28B8AE]">
              {activeTab}
            </h2>

            {/* Popup Content */}
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200 mb-6 shadow-inner">
              <p className="text-gray-700 font-semibold">{getPopupText()}</p>
            </div>

            {/* ✅ Download Button */}
            {(activeTab === "Total Residents" && residents.length > 0) ||
            (activeTab === "Guards" && guards.length > 0) ? (
              <div className="flex justify-center">
                <DownloadButton
                  fileName={
                    activeTab === "Guards"
                      ? "total_guards_export"
                      : "total_residents_export"
                  }
                  data={
                    activeTab === "Guards"
                      ? guards.map((g) => ({
                          Name: g.first_name,
                          Flat: g.flat_no || "-",
                          Phone: g.phone_number || "-",
                          Role: g.user_type,
                        }))
                      : residents.map((r) => ({
                          Name: r.first_name,
                          Flat: r.flat_no,
                          Phone: r.phone_number || "-",
                          Role: r.user_type,
                        }))
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
