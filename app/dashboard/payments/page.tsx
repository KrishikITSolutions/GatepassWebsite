"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import { CreditCard, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import SocietySelector from "@/components/societyselector";

type PaidMonth = {
  month: string;
  year: number | string;
  amount_paid?: number;
  amount?: number;
  payment_date?: string;
};

type Payment = {
  id: number;
  society_id: string;
  residence_id: string;
  resident: {
    first_name: string;
    tower: string;
    flat_no: string;
  } | null;
  paid_months?: PaidMonth[];
  isPaid?: boolean;
};

const cards = [
  { key: "PAID", label: "Paid", icon: CheckCircle },
  { key: "UNPAID", label: "Unpaid", icon: XCircle },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeCard, setActiveCard] = useState<"PAID" | "UNPAID" | null>(null);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());

  const [selectedSocietyId, setSelectedSocietyId] = useState<string | null>(null);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [showList, setShowList] = useState(false);

  const authUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth_user") || "{}")
      : null;

  const { role, society_id } = authUser || {};
  const effectiveSocietyId = role === "admin" ? selectedSocietyId : society_id;

  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const now = new Date();
    setFilterMonth(
      now.toLocaleString("default", { month: "long" }).toLowerCase()
    );
    setFilterYear(now.getFullYear());
  }, []);

  useEffect(() => {
    const checkPaymentsEnabled = async () => {
      if (!effectiveSocietyId) return;

      const { data } = await supabase
        .from("payment_master_table")
        .select("month, year")
        .eq("society_id", effectiveSocietyId)
        .single();

      if (!data) {
        setPaymentsEnabled(false);
        setPayments([]);
        return;
      }

      setPaymentsEnabled(true);
    };

    checkPaymentsEnabled();
  }, [effectiveSocietyId]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!effectiveSocietyId || !paymentsEnabled) return;

      setLoading(true);

      const { data: paymentsData } = await supabase
        .from("payment_details")
        .select("*")
        .eq("society_id", effectiveSocietyId);

      const residentIds = paymentsData?.map(p => p.residence_id) || [];

      const { data: residents } = await supabase
        .from("resident_profiles")
        .select("resident_id, first_name, tower, flat_no")
        .in("resident_id", residentIds);

      const merged =
        paymentsData?.map(p => ({
          ...p,
          resident:
            residents?.find(r => r.resident_id === p.residence_id) || null,
        })) || [];

      setPayments(merged);
      setLoading(false);
    };

    fetchPayments();
  }, [effectiveSocietyId, paymentsEnabled]);

  const processedPayments = payments.map(p => {
    const isPaid =
      p.paid_months?.some(
        pm =>
          pm.month.toLowerCase() === filterMonth &&
          pm.year.toString() === filterYear.toString()
      ) ?? false;

    return { ...p, isPaid };
  });

  const paidList = processedPayments.filter(p => p.isPaid);
  const unpaidList = processedPayments.filter(p => !p.isPaid);

  const listToShow = activeCard === "PAID" ? paidList : unpaidList;

  if (!paymentsEnabled && effectiveSocietyId) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <AlertTriangle size={64} className="text-orange-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Payments not enabled
        </h2>
        <p className="text-gray-500 mt-2">
          for this society
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">
        Payments Dashboard
      </h1>

      {role === "admin" && (
        <div className="flex justify-center mb-6">
          <SocietySelector
            value={selectedSocietyId}
            onChange={setSelectedSocietyId}
          />
        </div>
      )}

      <div className="flex justify-center gap-4 mb-8">
        <select
          className="p-2 border rounded"
          value={filterMonth}
          onChange={e => setFilterMonth(e.target.value)}
        >
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filterYear}
          onChange={e => setFilterYear(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {cards.map(c => (
          <div
            key={c.key}
            onClick={() => {
              setActiveCard(c.key as any);
              setShowList(false);
            }}
            className="bg-white p-6 rounded-2xl shadow text-center cursor-pointer"
          >
            <c.icon className="mx-auto mb-3 text-teal-600" size={32} />
            <h2 className="text-lg font-semibold">{c.label}</h2>
          </div>
        ))}
      </div>

      {activeCard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[600px] relative max-h-[80vh] flex flex-col">
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-3 right-4 text-2xl font-bold"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-center">{activeCard}</h2>
              <p className="text-3xl font-bold text-teal-700 text-center mt-2">
                {listToShow.length}
              </p>
            </div>

            {!showList && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowList(true)}
                  className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold"
                >
                  View
                </button>
              </div>
            )}

            {/* Table container scrollable */}
            {showList && (
              <div className="overflow-y-auto flex-1 border rounded-lg">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-center">Flat</th>
                      <th className="border p-2 text-center">Date</th>
                      <th className="border p-2 text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listToShow.map(p => {
                      const monthData =
                        p.paid_months?.find(
                          pm =>
                            pm.month.toLowerCase() === filterMonth &&
                            pm.year.toString() === filterYear.toString()
                        );
                      const dateStr = monthData?.payment_date
                        ? new Date(monthData.payment_date).toLocaleDateString("en-GB")
                        : "-";
                      const amount = monthData?.amount_paid ?? monthData?.amount ?? "-";

                      return (
                        <tr key={p.id} className="border-t">
                          <td className="border p-2">{p.resident?.first_name}</td>
                          <td className="border p-2 text-center">
                            {p.resident?.tower}-{p.resident?.flat_no}
                          </td>
                          <td className="border p-2 text-center">{dateStr}</td>
                          <td className="border p-2 text-center">₹{amount}</td>
                        </tr>
                      );
                    })}
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