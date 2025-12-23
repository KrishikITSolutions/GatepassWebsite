"use client";

import React, { useState } from "react";

import { X, Download } from "lucide-react";
import { downloadData, DownloadFormat } from "../app/utils/downloadHelper";
interface DownloadButtonProps {
  fileName: string;
  data: any[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileName, data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<DownloadFormat | null>(null);

  const handleDownload = async (format: DownloadFormat) => {
    setLoading(format);
    try {
      await downloadData(fileName, data, format);
      setOpen(false); // Close popup after download
    } catch (err) {
      console.error("❌ Download failed:", err);
      alert("Download failed. Please try again!");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      {/* Main Download Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#28B8AE]/90 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition-all duration-200"
      >
        <Download size={18} />
        Download
      </button>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Choose Download Format
            </h2>

            <div className="flex flex-col gap-3">
              {/* CSV Button */}
              <button
                onClick={() => handleDownload("csv")}
                className={`w-full py-2 rounded-full text-white transition ${
                  loading === "csv"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={!!loading}
              >
                {loading === "csv" ? "Generating..." : "Download CSV"}
              </button>

              {/* Excel Button */}
              <button
                onClick={() => handleDownload("xlsx")}
                className={`w-full py-2 rounded-full text-white transition ${
                  loading === "xlsx"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={!!loading}
              >
                {loading === "xlsx" ? "Generating..." : "Download Excel"}
              </button>

              {/* PDF Button */}
              <button
                onClick={() => handleDownload("pdf")}
                className={`w-full py-2 rounded-full text-white transition ${
                  loading === "pdf"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-red-600"
                }`}
                disabled={!!loading}
              >
                {loading === "pdf" ? "Generating..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButton;
