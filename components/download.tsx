"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";

interface DownloadButtonProps {
  category?: string | null;
  onDownload: (type: string) => void;
}

export default function DownloadButton({ category, onDownload }: DownloadButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (confirm: boolean) => {
    if (confirm) {
      onDownload("PDF");
    }
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      {/* Main Download Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        <FileDown className="w-5 h-5" />
        Download PDF
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg border border-gray-300">
            <p className="text-center text-gray-800 mb-4 font-medium">
              Are you sure you want to download?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleConfirm(true)}
                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="px-3 py-1.5 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}