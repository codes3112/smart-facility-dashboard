export interface Report {
  id: number;
  zone: string;
  energyUsage: number;
  temperature: number;
  timestamp: string;
}

/**
Exports reports to a CSV file with AI summary at the top.
@param reports Array of report data
@param aiInsight Optional AI insight string
 */
export function exportToCSV(reports: Report[], aiInsight?: string): void {
  if (!reports || reports.length === 0) {
    console.warn("No reports available for export.");
    return;
  }

  const headers = ["ID", "Zone", "Energy Usage (kWh)", "Temperature (°C)", "Timestamp"];

  const rows = reports.map((r) => [
    r.id,
    r.zone,
    r.energyUsage,
    r.temperature,
    new Date(r.timestamp).toLocaleString(),
  ]);

  // Add AI summary at top if provided
  let csvContent = "";
  if (aiInsight) {
    csvContent += `"AI Insight: ${aiInsight.replace(/"/g, '""')}"\n\n`;
  }

  csvContent += [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `energy-report-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("CSV report exported successfully with AI summary.");
}
