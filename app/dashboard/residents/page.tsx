"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import { Users, Home, UserCheck, Phone, LogOut } from "lucide-react";
import SocietySelector from "@/components/societyselector";

// resident_type_id
const OWNER_UUID = "beeb50a5-5769-41a5-a121-4c6dd62c06ce";
const TENANT_UUID = "bd0986d4-4e4c-453b-9504-bfff91fe75f2";

// resident_sub_type_id
const SUB_TYPES = {
  owners: [
    { label: "Owner – Tenant (Residing)", id: "7dee5481-a464-4d65-975b-31c5d2782279" },
    { label: "Current Residing", id: "cc42bc3f-4fa9-4f83-a731-b614d4bad735" },
  ],
  tenants: [
    { label: "Moving-in", id: "5abd1d75-98a9-4475-9663-f0d97177d135" },
    { label: "Current Resident", id: "f88dc774-25ae-4fcd-b8ea-4dd4ddd85f9b" },
  ],
};

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

  const [selectedSubType, setSelectedSubType] = useState<{ label: string; id: string } | null>(null);
  const [subTypeCount, setSubTypeCount] = useState<number>(0);

  const [showList, setShowList] = useState(false);
  const [listData, setListData] = useState<Resident[]>([]);

  /* -------- Load user -------- */
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (!raw) return;

    const user = JSON.parse(raw);
    setUserRole(user.role);
    setSelectedSociety(user.role === "rwa" ? user.society_id : "ALL");
  }, []);

  /* -------- Load main counts -------- */
  useEffect(() => {
    if (!selectedSociety || !userRole) return;

    const societyFilter = selectedSociety === "ALL" ? null : selectedSociety;

    const loadStats = async () => {
      const newStats: Record<string, number> = {};

      // Total residents
      let q = supabase.from("resident_profiles").select("*", { count: "exact", head: true });
      if (societyFilter) q = q.eq("society_id", societyFilter);
      newStats.total = (await q).count ?? 0;

      // Owners
      let oq = supabase.from("resident_profiles").select("*", { count: "exact", head: true }).eq("resident_type_id", OWNER_UUID);
      if (societyFilter) oq = oq.eq("society_id", societyFilter);
      newStats.owners = (await oq).count ?? 0;

      // Tenants
      let tq = supabase.from("resident_profiles").select("*", { count: "exact", head: true }).eq("resident_type_id", TENANT_UUID);
      if (societyFilter) tq = tq.eq("society_id", societyFilter);
      newStats.tenants = (await tq).count ?? 0;

      // Login/Logout
      const { data } = await supabase.from("resident_profiles").select("device_token");
      newStats.login = data?.reduce((s: number, r: any) => s + (Array.isArray(r.device_token) ? r.device_token.length : 0), 0) ?? 0;
      newStats.logout = data?.filter((r: any) => !Array.isArray(r.device_token) || r.device_token.length === 0).length ?? 0;

      setStats(newStats);
    };

    loadStats();
  }, [selectedSociety, userRole]);

  /* -------- Subtype click → fetch COUNT -------- */
  const handleSubTypeClick = async (st: { label: string; id: string }) => {
    setSelectedSubType(st);
    setShowList(false);

    let q = supabase.from("resident_profiles").select("*", { count: "exact", head: true })
      .eq("resident_type_id", popupCard === "owners" ? OWNER_UUID : TENANT_UUID)
      .eq("resident_sub_type_id", st.id);

    if (selectedSociety !== "ALL") q = q.eq("society_id", selectedSociety);

    const { count } = await q;
    setSubTypeCount(count ?? 0);
  };

  /* -------- View list -------- */
  const loadListData = async () => {
    if (!popupCard) return;

    let q = supabase.from("resident_profiles").select("first_name, tower, flat_no, phone_number");

    if (popupCard === "owners") q = q.eq("resident_type_id", OWNER_UUID);
    else if (popupCard === "tenants") q = q.eq("resident_type_id", TENANT_UUID);
    else if (popupCard === "login") q = q.not("device_token", "is", null);
    else if (popupCard === "logout") q = q.or("device_token.is.null");

    if (selectedSociety !== "ALL") q = q.eq("society_id", selectedSociety);

    const { data } = await q;
    setListData(data || []);
    setShowList(true);
  };

  const activeCard = cards.find(c => c.key === popupCard);
  const ActiveIcon = activeCard?.icon;

  const subTypes = popupCard === "owners" ? SUB_TYPES.owners : popupCard === "tenants" ? SUB_TYPES.tenants : [];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">Total Members Dashboard</h1>

      {userRole === "admin" && (
        <div className="flex justify-center mb-10">
          <SocietySelector value={selectedSociety} onChange={setSelectedSociety} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(card => (
          <div
            key={card.key}
            onClick={() => {
              setPopupCard(card.key);
              setSelectedSubType(null);
              setShowList(false);
            }}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer hover:shadow-lg"
          >
            <card.icon className="mx-auto mb-3 text-teal-600" size={32} />
            <h2 className="text-lg font-semibold">{card.label}</h2>
          </div>
        ))}
      </div>

      {popupCard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[520px] relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => {
                setPopupCard(null);
                setSelectedSubType(null);
                setShowList(false);
              }}
              className="absolute top-3 right-4 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col items-center mb-4">
              {ActiveIcon && <ActiveIcon className="text-teal-600 mb-2" size={32} />}
              <h2 className="text-2xl font-semibold">{selectedSubType?.label || activeCard?.label}</h2>
            </div>

            {/* Subtypes for owners/tenants */}
            {(popupCard === "owners" || popupCard === "tenants") && !selectedSubType ? (
              <div className="space-y-3">
                {subTypes.map(st => (
                  <div
                    key={st.id}
                    onClick={() => handleSubTypeClick(st)}
                    className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50 text-center font-semibold"
                  >
                    {st.label}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-5xl font-bold text-teal-700 text-center mb-6">
                  {selectedSubType ? subTypeCount : stats[popupCard] ?? 0}
                </p>

                {!showList && (
                  <div className="flex justify-center">
                    <button
                      onClick={loadListData}
                      className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold"
                    >
                      View
                    </button>
                  </div>
                )}

                {showList && (
                  <div className="mt-6 max-h-72 overflow-y-auto border rounded-xl">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-center">Tower</th>
                          <th className="p-3 text-center">Flat</th>
                          <th className="p-3 text-center">Phone</th>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}