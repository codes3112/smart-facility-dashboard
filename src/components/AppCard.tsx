import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AppCardProps {
  title?: string;
  value?: string;
  subtitle?: string;
  header?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export default function AppCard({ title, value, subtitle, header, actions, children }: AppCardProps) {
  // If children are provided, use the generic card layout
  if (children) {
    return (
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{header || title}</CardTitle>
          {actions && <div>{actions}</div>}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }

  // Otherwise, use the dashboard card layout
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
