"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { supabase } from "@/app/utils/supabase";

function getAuthUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("auth_user");
  return stored ? JSON.parse(stored) : null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [role, setRole] = useState<"admin" | "rwa" | null>(null);
  const [societyName, setSocietyName] = useState<string | null>(null);

  useEffect(() => {
    const user = getAuthUser();
    if (!user) return;

    setRole(user.role);

    if (user.role === "rwa" && user.society_id) {
      supabase
        .from("society_profiles")
        .select("society_name")
        .eq("id", user.society_id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error) console.error("Error fetching society_name:", error);
          if (data) setSocietyName(data.society_name);
        });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar role={role} societyName={societyName} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} setActivePage={setActivePage} role={role} />
        <main className="flex-1 ml-64 mt-3 p-10 overflow-y-auto bg-gray-50 rounded-tl-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}
