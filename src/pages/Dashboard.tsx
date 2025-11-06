import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Dashboard</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Avg Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">22.4°C</div>
            <div className="text-sm text-slate-500">Last 24h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45%</div>
            <div className="text-sm text-slate-500">Last 24h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2 kWh</div>
            <div className="text-sm text-slate-500">Current</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Devices Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm text-slate-500">Total</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}






