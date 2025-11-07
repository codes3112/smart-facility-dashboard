import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/AppCard";
import AppTable from "@/components/AppTable";
import AppChart from "@/components/AppChart";
import { getReports, Report } from "@/services/reportService";


export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [zoneFilter, setZoneFilter] = useState<string>("all");

 useEffect(() => {
  async function loadReports() {
    const data: Report[] = await getReports(zoneFilter);
    setReports(data);
  }
  loadReports();
}, [zoneFilter]);


  const filteredReports =
    zoneFilter === "all"
      ? reports
      : reports.filter((r) => r.zone === zoneFilter);
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

  //Chart data — group by zone for aggregated metrics
  const energyChartData = Object.values(
    reports.reduce((acc: any, curr) => {
      if (!acc[curr.zone]) acc[curr.zone] = { zone: curr.zone, energy: 0 };
      acc[curr.zone].energy += curr.energyUsage;
      return acc;
    }, {})
  );
  const tempChartData = Object.values(
    reports.reduce((acc: any, curr) => {
      if (!acc[curr.zone]) acc[curr.zone] = { zone: curr.zone, temperature: 0, count: 0 };
      acc[curr.zone].temperature += curr.temperature;
      acc[curr.zone].count += 1;
      return acc;
    }, {})
  ).map((z: any) => ({
    zone: z.zone,
    temperature: z.temperature / z.count,
  }));
  const uniqueZones = Array.from(new Set(reports.map((r) => r.zone)));
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Reports
      </h2>
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
        <AppTable data={filteredReports} columns={columns} />
      </AppCard>
      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <AppChart
          title="Energy Usage by Zone"
          type="bar"
          data={energyChartData}
          xDataKey="zone"
          dataKeys={[
            { key: "energy", color: "#3b82f6", name: "Energy (kWh)" },
          ]}
        />
        <AppChart
          title="Average Temperature by Zone"
          type="line"
          data={tempChartData}
          xDataKey="zone"
          dataKeys={[
            {
              key: "temperature",
              color: "#f59e0b",
              name: "Temperature (°C)",
            },
          ]}
        />
      </div>
    </div>
  );
}