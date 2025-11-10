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

  // === CSV ===
  if (format === "csv") {
    const csvRows = [
      headers.join(","), // header row
      ...data.map((row) =>
        headers
          .map((h) =>
            // handle commas and quotes safely
            `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
    return;
  }

  // === XLSX ===
  if (format === "xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    return;
  }

  // === PDF ===
  if (format === "pdf") {
    const doc = new jsPDF();
    const rows = data.map((row) => headers.map((h) => row[h] ?? ""));
    autoTable(doc, {
      head: [headers.map((h) => h.replace(/_/g, " ").toUpperCase())],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 184, 174] },
    });
    doc.save(`${fileName}.pdf`);
  }
};
