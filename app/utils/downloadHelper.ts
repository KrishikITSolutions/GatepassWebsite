// utils/downloadHelper.ts
"use client";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type DownloadFormat = "csv" | "xlsx" | "pdf";

export const downloadData = (
  fileName: string,
  data: any[],
  format: DownloadFormat
) => {
  if (!data || data.length === 0) {
    alert("No data available for download!");
    return;
  }

  const headers = Object.keys(data[0]);

  if (format === "csv") {
    const csv = [
      headers.join(","),
      ...data.map(row =>
        headers.map(h => `"${row[h] ?? ""}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
  }

  if (format === "xlsx") {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  if (format === "pdf") {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [headers],
      body: data.map(row => headers.map(h => row[h] ?? "")),
    });
    doc.save(`${fileName}.pdf`);
  }
};
