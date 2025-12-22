"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import { Users, Home, UserCheck, Phone, LogOut } from "lucide-react";
import SocietySelector from "@/components/societyselector";

// UUIDs
const OWNER_UUID = "beeb50a5-5769-41a5-a121-4c6dd62c06ce";
const TENANT_UUID = "bd0986d4-4e4c-453b-9504-bfff91fe75f2";

type Resident = {
  first_name: string;
  tower: string;
  flat_no: string;
  phone_number: string;
};

const cards = [
  { key: "total", label: "Total Residents", icon: Users },
  { key: "owners", label: "Owners", icon: Home },
  { key: "tenants", label: "Tenants", icon: UserCheck },
  { key: "login", label: "Login Devices", icon: Phone },
  { key: "logout", label: "Logout Devices", icon: LogOut },
];

export default function TotalMembersDashboard() {
  const [selectedSociety, setSelectedSociety] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "rwa" | null>(null);

  const [stats, setStats] = useState<Record<string, number>>({});
  const [popupCard, setPopupCard] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [listData, setListData] = useState<Resident[]>([]);

  /* ---------------- Load user ---------------- */
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) return;

    const user = JSON.parse(raw);
    setUserRole(user.role);
    setSelectedSociety(user.role === "rwa" ? user.society_id : "ALL");
  }, []);

  /* ---------------- Load counts ---------------- */
  useEffect(() => {
    if (!selectedSociety || !userRole) return;

    const societyFilter = selectedSociety === "ALL" ? null : selectedSociety;

    const loadStats = async () => {
      const newStats: Record<string, number> = {};

      // Total
      let totalQ = supabase
        .from("resident_profiles")
        .select("*", { count: "exact", head: true });
      if (societyFilter) totalQ = totalQ.eq("society_id", societyFilter);
      newStats.total = (await totalQ).count ?? 0;

      // Owners
      let ownersQ = supabase
        .from("resident_profiles")
        .select("*", { count: "exact", head: true })
        .eq("resident_type_id", OWNER_UUID);
      if (societyFilter) ownersQ = ownersQ.eq("society_id", societyFilter);
      newStats.owners = (await ownersQ).count ?? 0;

      // Tenants
      let tenantsQ = supabase
        .from("resident_profiles")
        .select("*", { count: "exact", head: true })
        .eq("resident_type_id", TENANT_UUID);
      if (societyFilter) tenantsQ = tenantsQ.eq("society_id", societyFilter);
      newStats.tenants = (await tenantsQ).count ?? 0;

      // Login / Logout
      let loginQ = supabase.from("resident_profiles").select("device_token");
      if (societyFilter) loginQ = loginQ.eq("society_id", societyFilter);
      const { data } = await loginQ;

      const loginCount =
        data?.reduce(
          (s: number, r: any) =>
            s + (Array.isArray(r.device_token) ? r.device_token.length : 0),
          0
        ) ?? 0;

      const logoutCount =
        data?.filter(
          (r: any) =>
            !Array.isArray(r.device_token) || r.device_token.length === 0
        ).length ?? 0;

      newStats.login = loginCount;
      newStats.logout = logoutCount;

      setStats(newStats);
    };

    loadStats();
  }, [selectedSociety, userRole]);

  /* ---------------- Fetch list data ---------------- */
  const loadListData = async (key: string) => {
    let query = supabase
      .from("resident_profiles")
      .select("first_name, tower, flat_no, phone_number");

    if (selectedSociety !== "ALL") {
      query = query.eq("society_id", selectedSociety);
    }

    if (key === "owners") query = query.eq("resident_type_id", OWNER_UUID);
    if (key === "tenants") query = query.eq("resident_type_id", TENANT_UUID);

    const { data } = await query;
    setListData(data || []);
    setShowList(true);
  };

  const visibleCards =
    userRole === "rwa"
      ? cards.filter(c =>
          ["total", "owners", "tenants", "login", "logout"].includes(c.key)
        )
      : cards;

  const activeCard = visibleCards.find(c => c.key === popupCard);
  const ActiveIcon = activeCard?.icon;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        Total Members Dashboard
      </h1>

      {userRole === "admin" && (
        <div className="flex justify-center mb-10">
          <SocietySelector value={selectedSociety} onChange={setSelectedSociety} />
        </div>
      )}

      {/* Main cards – NO COUNTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleCards.map(card => (
          <div
            key={card.key}
            onClick={() => {
              setPopupCard(card.key);
              setShowList(false);
            }}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-lg"
          >
            <card.icon className="mx-auto mb-3 text-teal-600" size={32} />
            <h2 className="text-lg font-semibold">{card.label}</h2>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupCard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[520px] relative">
            <button
              onClick={() => {
                setPopupCard(null);
                setShowList(false);
              }}
              className="absolute top-3 right-4 text-2xl font-bold"
            >
              ×
            </button>

            {/* Icon + Heading */}
            <div className="flex flex-col items-center mb-4">
              {ActiveIcon && (
                <ActiveIcon className="text-teal-600 mb-2" size={32} />
              )}
              <h2 className="text-2xl font-semibold">
                {activeCard?.label}
              </h2>
            </div>

            {/* Count */}
            <p className="text-5xl font-bold text-teal-700 text-center mb-6">
              {stats[popupCard] ?? 0}
            </p>

            {/* View button */}
            {!showList && (
              <div className="flex justify-center">
                <button
                  onClick={() => loadListData(popupCard)}
                  className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold"
                >
                  View
                </button>
              </div>
            )}

            {/* Scrollable list */}
            {showList && (
              <div className="mt-6 max-h-72 overflow-y-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3">Tower</th>
                      <th className="p-3">Flat</th>
                      <th className="p-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">{r.first_name}</td>
                        <td className="p-3 text-center">{r.tower}</td>
                        <td className="p-3 text-center">{r.flat_no}</td>
                        <td className="p-3 text-center">{r.phone_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
