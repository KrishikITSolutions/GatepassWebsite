"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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
const ENTRY_COLORS = ["#93C5FD", "#A5B4FC", "#F9A8D4", "#FCD34D"];
const PAYMENT_COLORS = ["#86EFAC", "#FCA5A5"];

export default function DashboardSection() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">📊 Main Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to <span className="text-[#28B8AE] font-semibold">Happy Homes</span> — monthly overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5 overflow-hidden">
          <h3 className="font-semibold text-gray-700 mb-2">Monthly Entries</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={monthlyData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {monthlyData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={ENTRY_COLORS[idx % ENTRY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 overflow-hidden">
          <h3 className="font-semibold text-gray-700 mb-2">Payment Status (Monthly)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {paymentData.map((entry, idx) => (
                    <Cell key={`cell-pay-${idx}`} fill={PAYMENT_COLORS[idx % PAYMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* small overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { title: "Today's Deliveries", value: 24 },
          { title: "Today's Visitors", value: 18 },
          { title: "Active Visitors", value: 8 },
          { title: "New Registrations", value: 5 },
        ].map((c) => (
          <div key={c.title} className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-gray-500 text-sm">{c.title}</p>
            <p className="text-2xl font-bold text-[#28B8AE]">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
