import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export default function AppCard({ title, value, subtitle }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && <div className="text-sm text-slate-500">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}
