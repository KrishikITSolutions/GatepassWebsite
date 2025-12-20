"use client";
import { useState } from "react";
import { supabase } from "../app/utils/supabase";

export default function MediaUploader({ onUploaded }: {
  onUploaded: (url: string | null, type: string | null) => void;
}) {
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true);

    try {
      const filePath = `files/${Date.now()}_${file.name}`;

      // Upload to bucket
      const { data, error } = await supabase.storage
        .from("admin_notifications")
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("admin_notifications")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      //  Pass URL & type back to parent component
      onUploaded(publicUrl, file.type);

    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
        className="border p-2 rounded"
      />
      {loading && <p className="text-sm text-gray-500">Uploading…</p>}
    </div>
  );
}
