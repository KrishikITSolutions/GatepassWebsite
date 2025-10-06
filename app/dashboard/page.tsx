
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Hardcoded data for pie charts
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

// Colors for charts
const ENTRY_COLORS = ["#93C5FD", "#A5B4FC", "#F9A8D4", "#FCD34D"];
const PAYMENT_COLORS = ["#86EFAC", "#FCA5A5"];

export default function DashboardSection() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 rounded-xl">
      {/* Welcome Section */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to Happy Homes Dashboard
      </h1>
      <p className="text-gray-500 mb-8">
        Here's what's happening in your society today.
      </p>

      {/* Monthly Overview */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Monthly Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Entries Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-700 mb-2">Monthly Entries</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={monthlyData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {monthlyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ENTRY_COLORS[index % ENTRY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-700 mb-2">Payment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {paymentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Overview */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Today's Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Today's Deliveries", value: 24 },
          { title: "Today's Visitors", value: 18 },
          { title: "Active Visitors", value: 8 },
          { title: "New Registrations", value: 5 },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white shadow rounded-xl p-4 text-center"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-2xl font-bold text-blue-700">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
