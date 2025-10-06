
"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import Dashboard from "../dashboard/page";
import Payments from "../payments/page"; 
import Residents from "../residents/page"; 

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderSection = () => {
    switch (activePage) {
      case "Payments":
        return <Payments />;
      case "Residents":
        return <Residents />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto p-4">{renderSection()}</main>
      </div>
    </div>
  );
}
