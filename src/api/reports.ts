export interface Report {
  id: number;
  zone: string;
  energyUsage: number;
  temperature: number;
  timestamp: string;
}

const mockReports: Report[] = [
  { id: 1, zone: "Zone A", energyUsage: 240, temperature: 22, timestamp: "2025-11-06T08:00:00Z" },
  { id: 2, zone: "Zone B", energyUsage: 310, temperature: 24, timestamp: "2025-11-06T09:00:00Z" },
  { id: 3, zone: "Zone C", energyUsage: 180, temperature: 21, timestamp: "2025-11-06T09:30:00Z" },
  { id: 4, zone: "Zone A", energyUsage: 270, temperature: 23, timestamp: "2025-11-06T10:00:00Z" },
  { id: 5, zone: "Zone B", energyUsage: 290, temperature: 25, timestamp: "2025-11-06T11:00:00Z" },
  { id: 6, zone: "Zone C", energyUsage: 210, temperature: 22, timestamp: "2025-11-06T11:30:00Z" },
];

export async function fetchReports(): Promise<Report[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockReports), 500));
}