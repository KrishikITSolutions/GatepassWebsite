"use client";

import { useState ,useEffect} from "react";
import { supabase } from "@/app/utils/supabase";
import { CheckCircle, XCircle, Bell } from "lucide-react";
import SocietySelector from "@/components/societyselector";

export default function SendNotificationPage() {
  const [societyId, setSocietyId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: string; text: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");



  
  console.log("Upload image:", file);
  const showToast = (type: string, text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSend = async () => {
    if (!societyId || !title || !message) {
      return showToast("error", "All fields are required.");
    }

    setLoading(true);

    try {
      let mediaUrl: string | null = null;
      let mediaType: "image" | "video" | null = null;

      // Upload file if selected
      if (file) {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;

        const { data, error } = await supabase.storage
          .from("admin_notifications")
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (error) {
          showToast("error", "Failed to upload file");
          console.log("Upload error:", error.message);
          setLoading(false);
          return;
        }

        // Get public URL
        mediaUrl = supabase.storage
          .from("admin_notifications")
          .getPublicUrl(fileName).data.publicUrl;

        mediaType = file.type.startsWith("image") ? "image" : "video";

        console.log("Uploaded media URL:", mediaUrl);
      }

      //  CALL ONLY EDGE FUNCTION — NO INSERT from client
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/Website-Notifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            society_id: societyId,
            title,
            body: message,
            media_url: mediaUrl,
            media_type: mediaType,
            category,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        showToast("error", result.error || "Something went wrong.");
      } else {
        showToast("success", "Notification sent successfully!");
        setSocietyId("");
        setTitle("");
        setMessage("");
        setFile(null);
      }
    } catch (err: any) {
      showToast("error", err.message || "Unexpected error");
    }

    setLoading(false);
  };

  useEffect(() => {
  console.log("Selected society_id:", societyId);
}, [societyId]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 relative">

        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <Bell size={40} className="text-[#28B8AE]" />
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          Send Notification
        </h2>

        
        {/* Society Selector */}
        <div className="mb-6">
          <label className="font-semibold text-gray-800 mb-1 block">
            Select Society
          </label>

          

          <SocietySelector
            value={societyId || null}
            onChange={(id) => setSocietyId(id ?? "")}
          />
        </div>
        
        

        {/* Category */}
        <label className="font-semibold text-gray-800">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Category</option>
          <option value="emergency">🚨 Emergency</option>
          <option value="warning">⚠️ Warning</option>
          <option value="general">ℹ️ General Info</option>
        </select>
        <div className="h-4" />

        {/* Title */}
        <div className="mb-6">
          <label className="font-semibold text-gray-800">Title</label>
          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#28B8AE] outline-none transition-all"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="font-semibold text-gray-800">Message</label>
          <textarea
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 mt-1 h-32 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#28B8AE] outline-none transition-all resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="font-semibold text-gray-800">Upload Image / Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-xl"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold text-lg shadow-lg transition-all active:scale-[0.97]
            ${loading
              ? "bg-[#28B8AE]/60 cursor-not-allowed"
              : "bg-[#28B8AE] hover:bg-[#239b96]"
            }`}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-25 right-6 px-5 py-3 rounded-full shadow-xl text-white flex items-center gap-3 animate-slide-in 
              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {toast.type === "success" ? <CheckCircle size={22} /> : <XCircle size={22} />}
            <span className="font-medium">{toast.text}</span>
          </div>
        )}

      </div>
    </div>
  );
}
