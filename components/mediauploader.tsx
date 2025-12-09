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
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("admin_notifications")
        .upload(`files/${fileName}`, file, { upsert: false });

      if (error) throw error;

      // fix: data.fullPath is the correct field
      const filePath = data.fullPath || data.path;

      const { data: publicUrl } = supabase.storage
        .from("admin_notifications")
        .getPublicUrl(filePath);

      const publicUrlStr = publicUrl.publicUrl;

      const mime = file.type;
      const mediaType = mime.startsWith("image")
        ? "image"
        : mime.startsWith("video")
          ? "video"
          : null;

      onUploaded(publicUrlStr, mediaType);


    } catch (err) {
      console.log(err);
      onUploaded(null, null);
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
