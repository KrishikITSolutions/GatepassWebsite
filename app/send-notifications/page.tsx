"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function SendNotificationPage() {
  const [societyId, setSocietyId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sendNotification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (await supabase.auth.getSession())?.data.session?.access_token
            }`,
          },
          body: JSON.stringify({
            society_id: societyId,
            title,
            body: message,
          }),
        }
      );

      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setResponse("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Send Notification
        </h2>

        {/* Society ID */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Society</label>
          <input
            type="text"
            placeholder="Enter society_id (Ex: A_MC0_BLR_04)"
            value={societyId}
            onChange={(e) => setSocietyId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Notification Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 h-28 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full bg-[#28B8AE] hover:bg-[#239b96] text-white py-3 rounded-lg font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>

        {/* Result Box */}
        {response && (
          <pre className="mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
