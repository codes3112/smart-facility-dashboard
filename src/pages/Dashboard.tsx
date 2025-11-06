import AppCard from "@/components/AppCard";
import AppChart from "@/components/AppChart";
const temperatureData = [
  { time: "08:00", temperature: 22.1, humidity: 44 },
  { time: "10:00", temperature: 23.4, humidity: 46 },
  { time: "12:00", temperature: 24.8, humidity: 45 },
  { time: "14:00", temperature: 25.1, humidity: 47 },
  { time: "16:00", temperature: 23.9, humidity: 48 },
  { time: "18:00", temperature: 22.6, humidity: 44 },
];
const energyData = [
  { zone: "Lobby", energy: 12 },
  { zone: "Conference", energy: 18 },
  { zone: "Office 1", energy: 9 },
  { zone: "Office 2", energy: 14 },
  { zone: "Server Room", energy: 22 },
];
export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
        Dashboard
      </h2>
      {/* Summary cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AppCard title="Avg Temperature" value="22.4°C" subtitle="Last 24h" />
        <AppCard title="Avg Humidity" value="45%" subtitle="Last 24h" />
        <AppCard title="Energy Usage" value="1.2 kWh" subtitle="Current" />
        <AppCard title="Devices Online" value="12" subtitle="Total" />
      </div>
      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppChart
          title="Temperature & Humidity Trends"
          type="line"
          data={temperatureData}
          xDataKey="time"
          dataKeys={[
            { key: "temperature", color: "#6366f1", name: "Temperature (°C)" },
            { key: "humidity", color: "#22c55e", name: "Humidity (%)" },
          ]}
        />
        <AppChart
          title="Energy Usage by Zone"
          type="bar"
          data={energyData}
          xDataKey="zone"
          dataKeys={[{ key: "energy", color: "#f59e0b", name: "Energy (kWh)" }]}
        />
      </div>
    </div>
  );
}
