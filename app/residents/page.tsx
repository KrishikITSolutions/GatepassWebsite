
"use client";

export default function ResidentProfiles() {
  const residents = [
    { name: "John Doe", flat: "A-101", contact: "+91 98765 43210", EMail:"ramtalapala@123", entries:"hello mones" },
    { name: "Jane Smith", flat: "B-204", contact: "+91 91234 56789" },
    { name: "Rajesh Kumar", flat: "C-307", contact: "+91 99887 66554" },
    { name: "Rajesh Kumar", flat: "C-307", contact: "+91 99887 66554" },
    { name: "Rajesh Kumar", flat: "C-307", contact: "+91 99887 66554" },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 rounded-xl">
    
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        🏘️ Resident Profiles
      </h1>
      <p className="text-gray-500 mb-6">
        Overview of all registered residents.
      </p>

      {/* Table Container */}
      <div className=" fbg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="🔍 Search Resident..."
            className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#28B8AE]/60 transition"
          />
          <button className="bg-[#28B8AE] text-white px-5 py-2 rounded-full shadow hover:shadow-lg transition">
            ➕ Add Resident
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#28B8AE]/10 text-[#28B8AE] uppercase text-sm font-semibold tracking-wide">
                <th className="py-3 px-4 text-left rounded-tl-xl">
                  Resident Name
                </th>
                <th className="py-3 px-4 text-left">Flat No</th>
                 <th className="py-3 px-4 text-left"> Contact</th>
                 <th className="py-3 px-4 text-left"> entries</th>
                 <th className="py-3 px-4 text-left"> entries</th>
                 <th className="py-3 px-4 text-left"> entries</th>
                 <th className="py-3 px-4 text-left"> entries</th>
                 
                <th className="py-3 px-4 text-left rounded-tr-xl">EMail</th>
                <th className="py-3 px-4 text-left"> entries</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {residents.map((resident, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition border-b border-gray-200 last:border-0"
                >
                  <td className="py-3 px-4">{resident.name}</td>
                  <td className="py-3 px-4">{resident.flat}</td>
                  <td className="py-3 px-4">{resident.contact}</td>
                   <td className="py-3 px-4">{resident.EMail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
}