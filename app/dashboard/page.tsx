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

const ENTRY_COLORS = ["#3B82F6", "#6366F1", "#48bbecff", "#0bf5e2ff"];
const PAYMENT_COLORS = ["#10B981", "#F87171"];

export default function DashboardSection() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [todayStats, setTodayStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AUTH USER (UNCHANGED BASE)
  const authUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth_user") || "{}")
      : null;

  const { role, society_id } = authUser || {};

  console.log(" AUTH USER:", authUser);
  console.log(" ROLE:", role);
  console.log(" SOCIETY ID:", society_id);

  /* ===================== MONTHLY ENTRIES ===================== */
  const fetchMonthlyEntries = async () => {
    console.log(" Fetching Monthly Entries...");

    const entryTypes = ["delivery", "visitor", "cab", "workers"];
    const now = new Date();

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    console.log(" Monthly Range:", {
      start: monthStart.toISOString(),
      end: monthEnd.toISOString(),
    });

    const results = await Promise.all(
      entryTypes.map(async (type) => {
        let query = supabase
          .from("visitors_enrtries")
          .select("id", { count: "exact", head: true })
          .eq("entry_type", type)
          .gte("start_date", monthStart.toISOString())
          .lte("start_date", monthEnd.toISOString());

        if (role === "rwa" && society_id) {
          query = query.eq("society_id", society_id);
        }


        const { count, error } = await query;

        console.log(` Monthly ${type}:`, count);
        if (error) console.error(" Monthly error:", error);

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
    console.log(" Fetching Today Live Data...");

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    console.log(" Today Range:", {
      start: todayStart.toISOString(),
      end: todayEnd.toISOString(),
    });

    const getCount = async (type: string) => {
      let query = supabase
        .from("visitors_enrtries")
        .select("id", { count: "exact", head: true })
        .eq("entry_type", type)
        .gte("start_date", todayStart.toISOString())
        .lte("start_date", todayEnd.toISOString());

      if (role === "rwa" && society_id) {
  query = query.eq("society_id", society_id);
}


      const { count, error } = await query;

      console.log(` Today ${type}:`, count);
      if (error) console.error(" Today error:", error);

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
    console.log(" Fetching Payment Stats...");

    const now = new Date();
    const monthText = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();

    console.log(" Payment Filters:", { monthText, year });

    const getCount = async (paid: boolean) => {
      let query = supabase
        .from("payment_details")
        .select("id", { count: "exact", head: true })
        // .eq("month", monthText) //  DECEMBER / december FIX
        // .eq("month_number", now.getMonth() + 1)
        .ilike("month", monthText)

        .eq("year", year)
        .eq("paid_status", paid);

      if (role === "rwa" && society_id) {
  query = query.eq("society_id", society_id);
}


      const { count, error } = await query;

      console.log(`💳 ${paid ? "PAID" : "UNPAID"} COUNT:`, count);
      if (error) console.error(" Payment error:", error);

      return count || 0;
    };

    const paid = await getCount(true);
    const unpaid = await getCount(false);

    console.log(" FINAL PAYMENT TOTAL:", { paid, unpaid });

    setPaymentData([
      { name: "Paid", value: paid },
      { name: "Unpaid", value: unpaid },
    ]);
  };

  /* ===================== INIT ===================== */
  useEffect(() => {
    if (!role) return;

    (async () => {
      setLoading(true);

      await Promise.all([
        fetchMonthlyEntries(),
        fetchTodayStats(),
        fetchPaymentStats(),
      ]);

      setLoading(false);
    })();
  }, [role, society_id]);


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
        <ChartCard
          title="Monthly Entries"
          data={monthlyData}
          colors={ENTRY_COLORS}
        />
        <ChartCard
          title="Payment Status"
          data={paymentData}
          colors={PAYMENT_COLORS}
        />
      </div>

      {/* TODAY LIVE DATA */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Today's Live Data
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {todayStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow text-center"
            >
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
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <TrendingUp />
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={110}>
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <p className="text-center text-2xl font-bold mt-4">{total}</p>
    </div>
  );
};