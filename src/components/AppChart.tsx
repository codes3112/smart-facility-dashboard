import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
interface AppChartProps {
  title: string;
  type: "line" | "bar";
  data: any[];
  dataKeys: { key: string; color: string; name?: string }[];
  xDataKey: string;
}
export default function AppChart({ title, type, data, dataKeys, xDataKey }: AppChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-700" />
              <XAxis dataKey={xDataKey} tick={{ fill: "#94a3b8" }} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30,41,59,0.9)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              {dataKeys.map(({ key, color, name }) => (
                <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} name={name || key} />
              ))}
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-700" />
              <XAxis dataKey={xDataKey} tick={{ fill: "#94a3b8" }} />
              <YAxis tick={{ fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30,41,59,0.9)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              {dataKeys.map(({ key, color, name }) => (
                <Bar key={key} dataKey={key} fill={color} name={name || key} radius={[4, 4, 0, 0]} barSize={50}/>
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}