export interface Zone {
  id: number;
  name: string;
  type: string;
  status: "active" | "inactive";
  devices: number;
}

let zones: Zone[] = [
  { id: 1, name: "Zone A", type: "Office", status: "active", devices: 5 },
  { id: 2, name: "Zone B", type: "Lab", status: "inactive", devices: 3 },
  { id: 3, name: "Zone C", type: "Lobby", status: "active", devices: 2 },
];

export async function fetchZones(): Promise<Zone[]> {
  return new Promise((resolve) => setTimeout(() => resolve(zones), 500));
}

export async function addZone(zone: Omit<Zone, "id">): Promise<Zone> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newZone = { ...zone, id: zones.length + 1 };
      zones.push(newZone);
      resolve(newZone);
    }, 500);
  });
}

export async function updateZone(id: number, updated: Partial<Zone>): Promise<Zone | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = zones.findIndex((z) => z.id === id);
      if (index === -1) return resolve(null);
      zones[index] = { ...zones[index], ...updated };
      resolve(zones[index]);
    }, 500);
  });
}

export async function deleteZone(id: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      zones = zones.filter((z) => z.id !== id);
      resolve(true);
    }, 500);
  });
}