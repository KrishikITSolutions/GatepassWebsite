"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/app/utils/supabase";

type Society = {
  society_name: string;
  society_id: string;
};

type Props = {
  value: string | null;
  onChange: (societyId: string | null) => void;
};

export default function SocietySelector({ value, onChange }: Props) {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch societies
  useEffect(() => {
    const fetchSocieties = async () => {
      const { data } = await supabase
        .from("society_profiles")
        .select("society_name, society_id")
        .order("society_name");

      setSocieties(data || []);
    };

    fetchSocieties();
  }, []);

  // ✅ Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Find selected society by society_id (TEXT)
  const selectedSociety = societies.find(
    (s) => s.society_id === value
  );

  return (
    <div ref={wrapperRef} className="relative w-72">
      {/* Selector */}
      <div
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white cursor-pointer"
      >
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-700">
          {selectedSociety?.society_name || "Select society"}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {societies.map((s) => (
            <div
              key={s.society_id}                 // ✅ correct key
              onClick={() => {
                onChange(s.society_id);          // ✅ TEXT society_id
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50"
            >
              {s.society_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
