"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../utils/supabase";
import {
  Users,
  Truck,
  HardHat,
  CarFront,
  TrendingUp,
  Loader2,
} from "lucide-react";

const ENTRY_COLORS = ["#3B82F6", "#6366F1", "#EC4899", "#F59E0B"];
const PAYMENT_COLORS = ["#10B981", "#F87171"];

export default function DashboardSection() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [todayStats, setTodayStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const societyId = "A_DC0_BLR_01";

  // ---- Fetch Data ----
  const fetchMonthlyEntries = async () => {
    const entryTypes = ["delivery", "visitor", "cab", "workers"];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const results = await Promise.all(
      entryTypes.map(async (type) => {
        const { count } = await supabase
          .from("visitors_enrtries")
          .select("id", { count: "exact", head: true })
          .eq("society_id", societyId)
          .eq("entry_type", type)
          .gte("start_date", monthStart);
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          value: count || 0,
        };
      })
    );
    setMonthlyData(results);
  };

  const fetchTodayStats = async () => {
    const today = new Date().toISOString().split("T")[0];
    const getCount = async (type: string) => {
      const { count } = await supabase
        .from("visitors_enrtries")
        .select("id", { count: "exact", head: true })
        .eq("society_id", societyId)
        .eq("entry_type", type)
        .gte("start_date", `${today}T00:00:00`)
        .lte("start_date", `${today}T23:59:59`);
      return count || 0;
    };

    const [deliveries, visitors, cabs, workers] = await Promise.all([
      getCount("delivery"),
      getCount("visitor"),
      getCount("cab"),
      getCount("workers"),
    ]);

    setTodayStats([
      { title: "Deliveries", value: deliveries, icon: Truck },
      { title: "Visitors", value: visitors, icon: Users },
      { title: "Cabs", value: cabs, icon: CarFront },
      { title: "Workers", value: workers, icon: HardHat },
    ]);
  };

  useEffect(() => {
    (async () => {
      await Promise.all([fetchMonthlyEntries(), fetchTodayStats()]);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="flex h-[80vh] items-center justify-center text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Preparing your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FFFFFF] to-[#F3F4F6] px-6 md:px-14 py-12 space-y-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#28B8AE]/10 rounded-full blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl font-bold tracking-tight text-gray-800">
          Society Dashboard
        </h1>
      
      </motion.div>

      {/* ---- PIE CHARTS FIRST ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10"
      >
        <ChartCard title="Monthly Entries" data={monthlyData} colors={ENTRY_COLORS} />
        <ChartCard title="Payment Status" data={paymentData} colors={PAYMENT_COLORS} />
      </motion.div>

      {/* ---- TODAY'S LIVE DATA BELOW ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Today's Live Data
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {todayStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(40,184,174,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/70 backdrop-blur-2xl border border-gray-100 rounded-3xl p-7 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <stat.icon className="text-[#28B8AE] w-8 h-8 mb-3" />
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const ChartCard = ({
  title,
  data,
  colors,
}: {
  title: string;
  data: any[];
  colors: string[];
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 180, damping: 15 }}
    className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-6 shadow-lg transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <TrendingUp className="text-[#28B8AE] w-5 h-5" />
    </div>
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          innerRadius={55}
          paddingAngle={3}
          cornerRadius={8}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            backgroundColor: "#fff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);
