import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/AppCard";
import AppTable from "@/components/AppTable";
import AppChart from "@/components/AppChart";
import {
  getReportsByZone,
  getEnergyChartData,
  getTemperatureChartData,
} from "@/services/reportService";
import { Report } from "@/api/reports";
import { useLoader } from "@/hooks/useLoader";
import { AiAdvisor } from "@/components/ai/AiAdvisor";
import { useAiInsights } from "@/hooks/useAiInsights";
import { exportToCSV } from "@/lib/exportCSVReport";
export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [reportData, setReportData] = useState<Report[]>([]);
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [energyChartData, setEnergyChartData] = useState<any[]>([]);
  const [tempChartData, setTempChartData] = useState<any[]>([]);
  const { showLoader, hideLoader } = useLoader();
  const { generateInsight, loading, insight } = useAiInsights();

  const loadReports = async () => {
    showLoader();
    const reportsData = await getReportsByZone(zoneFilter);
    const energyData = await getEnergyChartData(zoneFilter);
    const temperatureData = await getTemperatureChartData(zoneFilter);
    setReports(reportsData);
    setReportData(reportsData);
    setEnergyChartData(energyData);
    setTempChartData(temperatureData);
    hideLoader();
  }
  useEffect(() => {
    loadReports();
  }, [zoneFilter]);

  const handleExport = () => {
    exportToCSV(reportData, insight?.response);
  };

  const handleGenerateSummary = async () => {
    const prompt = `Summarize the following energy report and suggest improvements:\n${JSON.stringify(
      reportData
    )}`;
    await generateInsight(prompt);
  };

  const columns = [
    { title: "Zone", render: (row: Report) => row.zone },
    { title: "Energy (kWh)", render: (row: Report) => row.energyUsage },
    { title: "Temperature (°C)", render: (row: Report) => row.temperature },
    {
      title: "Timestamp",
      render: (row: Report) =>
        new Date(row.timestamp).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
  ];
  const uniqueZones = Array.from(new Set(reports.map((r) => r.zone)));
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Reports
      </h2>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <button
          onClick={handleGenerateSummary}
          className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
          disabled={loading}
        >
          {loading ? "Generating AI Summary..." : "Generate AI Summary"}
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Export Report + AI Summary
        </button>
        {insight && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <strong>AI Summary:</strong> {insight.response}{" "}
            <span className="text-sm text-gray-500">({insight.mode})</span>
          </div>
        )}
        {/* Report Table */}
        <AppCard
          header="Report Summary"
          actions={
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={zoneFilter === "all" ? "default" : "outline"}
                onClick={() => setZoneFilter("all")}
              >
                All
              </Button>
              {uniqueZones.map((zone) => (
                <Button
                  key={zone}
                  variant={zoneFilter === zone ? "default" : "outline"}
                  onClick={() => setZoneFilter(zone)}
                >
                  {zone}
                </Button>
              ))}
            </div>
          }
        >
          <AppTable data={reports} columns={columns} />
        </AppCard>
        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Energy chart */}
          <AppChart
            title={
              zoneFilter === "all"
                ? "Energy Usage by Zone"
                : `Energy Over Time — ${zoneFilter}`
            }
            type={zoneFilter === "all" ? "bar" : "line"}
            data={energyChartData}
            xDataKey={zoneFilter === "all" ? "zone" : "time"}
            dataKeys={[
              {
                key: zoneFilter === "all" ? "energy" : "energy",
                color: "#3b82f6",
                name: "Energy (kWh)",
              },
            ]}
          />
          {/* Temperature chart */}
          <AppChart
            title={
              zoneFilter === "all"
                ? "Average Temperature by Zone"
                : `Temperature Over Time — ${zoneFilter}`
            }
            type="line"
            data={tempChartData}
            xDataKey={zoneFilter === "all" ? "zone" : "time"}
            dataKeys={[
              {
                key: zoneFilter === "all" ? "temperature" : "temperature",
                color: "#f59e0b",
                name: "Temperature (°C)",
              },
            ]}
          />
        </div>
        <AiAdvisor />
      </div>
    </div>
  );
}