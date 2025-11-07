import { fetchReports, Report } from "@/api/reports";

export async function getReports(): Promise<Report[]> {
  // Fetch all reports from API
  const reports = await fetchReports();
  return reports;
}
export async function getReportsByZone(zone: string): Promise<Report[]> {
  const reports = await fetchReports();
  if (zone === "all") return reports;
  return reports.filter((r) => r.zone === zone);
}
export async function getEnergyChartData(zone: string): Promise<any[]> {
  const reports = await getReportsByZone(zone);
  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (zone === "all") {
    // Aggregate energy by zone
    const energyMap: Record<string, number> = {};
    reports.forEach((r) => {
      energyMap[r.zone] = (energyMap[r.zone] || 0) + r.energyUsage;
    });
    return Object.entries(energyMap).map(([zone, energy]) => ({ zone, energy }));
  } else {
    // Time-series for a single zone
    return reports
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((r) => ({ time: fmtTime(r.timestamp), energy: r.energyUsage }));
  }
}
export async function getTemperatureChartData(zone: string): Promise<any[]> {
  const reports = await getReportsByZone(zone);
  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (zone === "all") {
    // Average temperature per zone
    const tempMap: Record<string, { total: number; count: number }> = {};
    reports.forEach((r) => {
      if (!tempMap[r.zone]) tempMap[r.zone] = { total: 0, count: 0 };
      tempMap[r.zone].total += r.temperature;
      tempMap[r.zone].count += 1;
    });
    return Object.entries(tempMap).map(([zone, { total, count }]) => ({
      zone,
      temperature: total / count,
    }));
  } else {
    // Time-series for a single zone
    return reports
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((r) => ({ time: fmtTime(r.timestamp), temperature: r.temperature }));
  }
}