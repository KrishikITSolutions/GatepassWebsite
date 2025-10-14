"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Data
const monthlyData = [
  { name: "Deliveries", value: 40 },
  { name: "Visitors", value: 30 },
  { name: "Cab Entries", value: 20 },
  { name: "Worker Entries", value: 10 },
];

const paymentData = [
  { name: "Paid", value: 75 },
  { name: "Unpaid", value: 25 },
];

const ENTRY_COLORS = ["#3B82F6", "#6366F1", "#EC4899", "#F59E0B"];
const PAYMENT_COLORS = ["#10B981", "#F87171"];

// Mini stats
const statsCards = [
  { title: "Today's Deliveries", value: 24 },
  { title: "Today's Visitors", value: 18 },
  { title: "Active Visitors", value: 8 },
  { title: "New Registrations", value: 5 },
];

export default function DashboardSection() {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-10 space-y-10 bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Main Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-lg">
          Welcome to <span className="text-[#28B8AE] font-semibold">Happy Homes</span> — monthly overview.
        </p>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Monthly Entries */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-gray-700 mb-4 text-lg">Monthly Entries</h3>
          <div className="w-full h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={monthlyData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  innerRadius={40}
                  paddingAngle={3}
                  cornerRadius={10}
                  label={(entry: any) =>
                    `${entry.name}: ${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`
                  }
                >
                  {monthlyData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={ENTRY_COLORS[idx % ENTRY_COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{ borderRadius: 8, backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  itemStyle={{ fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Status */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-gray-700 mb-4 text-lg">Payment Status</h3>
          <div className="w-full h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  innerRadius={50}
                  cornerRadius={10}
                  paddingAngle={3}
                  label={(entry: any) =>
                    `${entry.name}: ${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`
                  }
                >
                  {paymentData.map((entry, idx) => (
                    <Cell key={`cell-pay-${idx}`} fill={PAYMENT_COLORS[idx % PAYMENT_COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{ borderRadius: 8, backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  itemStyle={{ fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {statsCards.map((c) => (
    <div
      key={c.title}
      className="cursor-pointer p-8 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center justify-center bg-white"
    >
      <p className="text-gray-500 text-sm mb-2">{c.title}</p>
      <p className="text-2xl md:text-3xl font-bold text-[#28B8AE]">{c.value}</p>
    </div>
  ))}
</div>

        
    </div>
  );
} 
