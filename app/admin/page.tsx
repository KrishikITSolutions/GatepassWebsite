
"use client";
import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    console.log("Admin dashboard accessed");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome to the admin panel.</p>
      </div>
    </div>
  );
}
