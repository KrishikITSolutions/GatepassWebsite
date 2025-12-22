"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import DownloadButton from "@/components/download";
import { motion } from "framer-motion";
import SocietySelector from "@/components/societyselector";
import { Users, Home, UserCheck, Phone, LogOut } from "lucide-react";

const OWNER_UUID = "beeb50a5-5769-41a5-a121-4c6dd62c06ce";
const TENANT_UUID = "bd0986d4-4e4c-453b-9504-bfff91fe75f2";

const cards = [
  { key: "total", label: "Total Residents", icon: Users },
  { key: "login", label: "Login-Devices", icon: Phone },
  { key: "logout", label: "Logout-Devices", icon: LogOut },
  { key: "owners", label: "Owners", icon: Home },
  { key: "tenants", label: "Tenants", icon: UserCheck },
];

export default function TotalMembersWithDownloads() {
  const [selectedSociety, setSelectedSociety] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "rwa" | null>(null);

  // counts
  const [totalResidents, setTotalResidents] = useState<number>(0);
  const [loginDevices, setLoginDevices] = useState<number>(0);
  const [logoutDevices, setLogoutDevices] = useState<number>(0);
  const [ownersCount, setOwnersCount] = useState<number>(0);
  const [tenantsCount, setTenantsCount] = useState<number>(0);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState<string | null>(null);
  const [modalList, setModalList] = useState<any[]>([]);
  const [loadingModalList, setLoadingModalList] = useState(false);

  // -------------------------
  // Get logged-in user role
  // -------------------------
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) return;
    const user = JSON.parse(raw);
    console.log("[TotalMembers] Logged-in user:", user);
    setUserRole(user.role);
    if (user.role === "rwa") {
      setSelectedSociety(user.society_id); // fixed society for RWA
    }
  }, []);

  // -------------------------
  // Load counts based on selected society
  // -------------------------
  useEffect(() => {
    if (!selectedSociety) return;

    const loadStats = async () => {
      console.log("[TotalMembers] Loading stats for society:", selectedSociety);
      try {
        // TOTAL RESIDENTS
        let totalQuery = supabase.from("resident_profiles").select("*", { count: "exact", head: true });
        if (selectedSociety !== "ALL") totalQuery = totalQuery.eq("society_id", selectedSociety);
        const { count: total } = await totalQuery;
        setTotalResidents(total || 0);

        // OWNERS
        let ownersQuery = supabase
          .from("resident_profiles")
          .select("*", { count: "exact", head: true })
          .eq("resident_type_id", OWNER_UUID);
        if (selectedSociety !== "ALL") ownersQuery = ownersQuery.eq("society_id", selectedSociety);
        const { count: ownerCount } = await ownersQuery;
        setOwnersCount(ownerCount || 0);

        // TENANTS
        let tenantsQuery = supabase
          .from("resident_profiles")
          .select("*", { count: "exact", head: true })
          .eq("resident_type_id", TENANT_UUID);
        if (selectedSociety !== "ALL") tenantsQuery = tenantsQuery.eq("society_id", selectedSociety);
        const { count: tenantCount } = await tenantsQuery;
        setTenantsCount(tenantCount || 0);

        if (userRole === "admin") {
          // LOGIN DEVICES
          let loginQuery = supabase
            .from("resident_profiles")
            .select("*", { count: "exact", head: true })
            .not("device_token", "is", null)
            .not("device_token", "eq", "{}");
          if (selectedSociety !== "ALL") loginQuery = loginQuery.eq("society_id", selectedSociety);
          const { count: loginCount } = await loginQuery;
          setLoginDevices(loginCount || 0);

          // LOGOUT DEVICES
          let logoutQuery = supabase
            .from("resident_profiles")
            .select("*", { count: "exact", head: true })
            .or("device_token.is.null,device_token.eq.{}");
          if (selectedSociety !== "ALL") logoutQuery = logoutQuery.eq("society_id", selectedSociety);
          const { count: logoutCount } = await logoutQuery;
          setLogoutDevices(logoutCount || 0);
        }
      } catch (err) {
        console.error("[TotalMembers] loadStats exception:", err);
      }
    };

    loadStats();
  }, [selectedSociety, userRole]);

  // -------------------------
  // Modal fetch on card click
  // -------------------------
  const onCardClick = async (key: string) => {
    if (!selectedSociety && userRole === "admin") {
      alert("Please select a society first");
      return;
    }

    setModalFor(key);
    setModalOpen(true);
    setLoadingModalList(true);

    try {
      let q = supabase
        .from("resident_profiles")
        .select(
          "first_name, flat as flat_no, tower as tower_name, phone_number, resident_sub_type, device_token"
        );

      // Society filter
      if (selectedSociety && selectedSociety !== "ALL") {
        q = q.eq("society_id", selectedSociety);
      }

      // Category filter
      switch (key) {
        case "owners":
          q = q.eq("resident_sub_type", OWNER_UUID);
          break;
        case "tenants":
          q = q.eq("resident_sub_type", TENANT_UUID);
          break;
        case "login":
          q = q.not("device_token", "is", null).not("device_token", "eq", "{}");
          break;
        case "logout":
          q = q.or("device_token.is.null,device_token.eq.{}");
          break;
      }

      const { data, error } = await q;
      if (error) throw error;

      const normalized = (data || []).map((r: any) => ({
        first_name: r.first_name ?? "",
        flat_no: r.flat_no ?? "",
        tower_name: r.tower_name ?? "",
        phone_number: r.phone_number ?? "",
      }));

      setModalList(normalized);
    } catch (err) {
      console.error("[TotalMembers] fetch list error:", err);
      setModalList([]);
    } finally {
      setLoadingModalList(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFor(null);
    setModalList([]);
  };

  const getCountForModal = () => {
    if (modalList && modalList.length > 0) return modalList.length;
    switch (modalFor) {
      case "owners":
        return ownersCount;
      case "tenants":
        return tenantsCount;
      case "login":
        return loginDevices;
      case "logout":
        return logoutDevices;
      case "total":
      default:
        return totalResidents;
    }
  };

  // -------------------------
  // Role-based cards
  // -------------------------
  const displayedCards = userRole === "rwa"
    ? cards.filter(c => ["total", "owners", "tenants"].includes(c.key))
    : cards;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-800 mb-10"
      >
        Total Members Dashboard
      </motion.h1>

      {/* SocietySelector for admin only */}
      {userRole === "admin" && (
        <div className="flex justify-center mb-10">
          <SocietySelector
            value={selectedSociety}
            onChange={(val) => setSelectedSociety(val)}
          />
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedCards.map((c) => (
          <div
            key={c.key}
            onClick={() => onCardClick(c.key)}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700">{c.label}</h2>
            <p className="text-4xl font-bold text-teal-600 mt-3">
              {{
                total: totalResidents,
                login: loginDevices,
                logout: logoutDevices,
                owners: ownersCount,
                tenants: tenantsCount,
              }[c.key]}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && modalFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {cards.find((c) => c.key === modalFor)?.label}
            </h2>

            <div className="text-center py-6 bg-gray-50 rounded-xl mb-6">
              {loadingModalList ? (
                <p className="text-gray-700 font-semibold">Loading count...</p>
              ) : (
                <p className="text-gray-700 font-semibold">{getCountForModal()} records</p>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <DownloadButton
                fileName={`${modalFor}_export`}
                data={modalList.length > 0 ? modalList : []}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}