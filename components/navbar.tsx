"use client";

import { useState, useEffect } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";

type NavbarProps = {
  role: "admin" | "rwa" | null;
  societyName?: string | null;
};

export default function Navbar({ role, societyName }: NavbarProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    if (role === "admin") {
      setTitle("Welcome to GatePass Admin Portal");
    } else if (role === "rwa" && societyName) {
      setTitle(`Welcome to ${societyName}`);
    } else if (role === "rwa") {
      setTitle("Welcome");
    }
  }, [role, societyName]);

  const logout = () => {
  setShowMenu(false);
  localStorage.removeItem("auth_user");
  router.push("/login");
};

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b shadow z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Image src={logo} alt="GatePass" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">
            {title}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-8 h-8 rounded-full"
              alt="User"
            />
            <ChevronDown size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow rounded w-40">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-50 w-full"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
