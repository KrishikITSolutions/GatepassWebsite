
"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import Dashboard from "../dashboard/page";
import VisitorManagementSystem from "../v-m-s/page";




export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderSection = () => {
    switch (activePage) {

     
      
        case "V_M_S":
        return <VisitorManagementSystem />;
        

    
      default:
        return <Dashboard />;
    }
  };

  return (
   <div className="flex flex-col h-screen bg-gray-100">
  <Navbar />
  <div className="flex flex-1 overflow-hidden">
    <Sidebar activePage={activePage} setActivePage={setActivePage} />
    <main className="flex-1 ml-53 mt-3 p-10 overflow-y-auto bg-gray-50 rounded-tl-3xl">
      {renderSection()}
    </main>
  </div>
</div>

  );
}
