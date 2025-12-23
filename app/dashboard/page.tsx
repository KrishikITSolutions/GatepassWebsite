"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../utils/supabase";
import { Users, Truck, HardHat, CarFront, TrendingUp, Loader2 } from "lucide-react";

const ENTRY_COLORS = ["#3bf6eaff", "#b163f1ff", "#ec48dbff", "#10a0b9ff"];
const PAYMENT_COLORS = ["#10B981", "#F87171"];

export default function DashboardSection() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [todayStats, setTodayStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const authUser = typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("auth_user") || "{}") 
    : null;

  const { role, society_id } = authUser || {};

  /* ===================== MONTHLY ENTRIES ===================== */
  const fetchMonthlyEntries = async () => {
    const entryTypes = ["delivery", "visitor", "cab", "workers"];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const results = await Promise.all(
      entryTypes.map(async (type) => {
        let query = supabase
          .from("visitors_enrtries")
          .select("id", { count: "exact", head: true })
          .eq("entry_type", type)
          .gte("start_date", monthStart.toISOString())
          .lte("start_date", monthEnd.toISOString());

        if (role === "rwa") query = query.eq("society_id", society_id);
        const { count } = await query;

        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          value: count || 0,
        };
      })
    );

    setMonthlyData(results);
  };

  /* ===================== TODAY LIVE DATA ===================== */
  const fetchTodayStats = async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const getCount = async (type: string) => {
      let query = supabase
        .from("visitors_enrtries")
        .select("id", { count: "exact", head: true })
        .eq("entry_type", type)
        .gte("start_date", todayStart.toISOString())
        .lte("start_date", todayEnd.toISOString());

      if (role === "rwa") query = query.eq("society_id", society_id);
      const { count } = await query;
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

  /* ===================== PAYMENTS ===================== */
  const fetchPaymentStats = async () => {
    const now = new Date();
    const monthText = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();

    const getCount = async (paid: boolean) => {
      let query = supabase
        .from("payment_details")
        .select("id", { count: "exact", head: true })
        .ilike("month", monthText)
        .eq("year", year)
        .eq("paid_status", paid);

      if (role === "rwa") query = query.eq("society_id", society_id);
      const { count } = await query;
      return count || 0;
    };

    const paid = await getCount(true);
    const unpaid = await getCount(false);

    setPaymentData([
      { name: "Paid", value: paid },
      { name: "Unpaid", value: unpaid },
    ]);
  };

  /* ===================== INIT ===================== */
  useEffect(() => {
    (async () => {
      await Promise.all([fetchMonthlyEntries(), fetchTodayStats(), fetchPaymentStats()]);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="flex h-[80vh] items-center justify-center text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Preparing your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] px-6 md:px-14 py-7 space-y-16">
      <motion.h1 className="text-center text-5xl font-bold text-gray-800">
        {role === "admin" ? "Admin Dashboard" : "Society Dashboard"}
      </motion.h1>

      {/* PIE CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ChartCard title="Monthly Entries" data={monthlyData} colors={ENTRY_COLORS} />
        <ChartCard title="Payment Status" data={paymentData} colors={PAYMENT_COLORS} />
      </div>

      {/* TODAY LIVE DATA */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Today's Live Data</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {todayStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow text-center">
              <stat.icon className="mx-auto mb-2 text-[#28B8AE]" />
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== CHART CARD ===================== */
const ChartCard = ({ title, data, colors }: any) => {
  const total = data.reduce((sum: number, d: any) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <TrendingUp className="text-gray-400" />
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={110} paddingAngle={3}>
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <p className="text-center text-2xl font-bold text-gray-800 mt-4">
        Total: {total}
      </p>

      {/* STRAIGHT LEGEND */}
      <div
        className={`mt-6 grid gap-4 text-sm ${
          data.length > 2 ? "grid-cols-4" : "grid-cols-2"
        }`}
      >
        {data.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-gray-600 font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
