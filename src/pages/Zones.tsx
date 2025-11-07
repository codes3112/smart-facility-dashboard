import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AppTable from "@/components/AppTable";
import AppChart from "@/components/AppChart";
import AppCard from "@/components/AppCard";
import AppDialog from "@/components/AppDialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Zone, fetchZones, addZone, updateZone, deleteZone } from "@/api/zones";
import { useLoader } from "@/hooks/useLoader";

export default function Zones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [devices, setDevices] = useState(0);
  const {showLoader, hideLoader} = useLoader();

  useEffect(() => {
    async function loadZones() {
      showLoader();
      const data = await fetchZones();
      setZones(data);
      hideLoader();
    }
    loadZones();
  }, []);
  const toggleStatus = async (id: number) => {
    const zone = zones.find(z => z.id === id);
    if (!zone) return;
    const updated = { status: zone.status === "active" ? "inactive" : "active" };
    const result = await updateZone(id, updated);
    if (result) {
      setZones(prev => prev.map(z => z.id === id ? result : z));
    }
  };
  const filteredZones =
    filterStatus === "all" ? zones : zones.filter(z => z.status === filterStatus);
  const energyData = filteredZones.map(z => ({
    zone: z.name,
    energy: z.devices * 2,
  }));
  const columns = [
    { title: "Name", render: (row: Zone) => row.name },
    { title: "Type", render: (row: Zone) => row.type },
    {
      title: "Status",
      render: (row: Zone) => (
        <span className={`px-2 py-1 rounded text-white ${row.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
          {row.status}
        </span>
      ),
    },
    { title: "Devices", render: (row: Zone) => row.devices },
    {
      title: "Actions",
      render: (row: Zone) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => toggleStatus(row.id)}>Toggle</Button>
          <Button size="sm" variant="outline" onClick={() => openEditDialog(row)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(row.id)}>Delete</Button>
        </div>
      ),
    },
  ];
  const openAddDialog = () => {
    setEditingZone(null);
    setName("");
    setType("");
    setStatus("active");
    setDevices(0);
    setDialogOpen(true);
  };
  const openEditDialog = (zone: Zone) => {
    setEditingZone(zone);
    setName(zone.name);
    setType(zone.type);
    setStatus(zone.status);
    setDevices(zone.devices);
    setDialogOpen(true);
  };
  const handleDelete = async (id: number) => {
    const success = await deleteZone(id);
    if (success) setZones(prev => prev.filter(z => z.id !== id));
  };
  const handleSubmit = async () => {
    if (editingZone) {
      const updated = await updateZone(editingZone.id, { name, type, status, devices });
      if (updated) setZones(prev => prev.map(z => z.id === updated.id ? updated : z));
    } else {
      const newZone = await addZone({ name, type, status, devices });
      setZones(prev => [...prev, newZone]);
    }
    setDialogOpen(false);
  };
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Zones</h2>
      <AppCard
        header="Zone Management"
        actions={
          <div className="flex gap-2">
            <Button onClick={() => setFilterStatus("all")}>All</Button>
            <Button onClick={() => setFilterStatus("active")}>Active</Button>
            <Button onClick={() => setFilterStatus("inactive")}>Inactive</Button>
            <Button onClick={openAddDialog}>Add Zone</Button>
          </div>
        }
      >
        <AppTable data={filteredZones} columns={columns} />
      </AppCard>
      <div className="w-full md:w-[600px] lg:w-[700px] mx-auto">
        <AppChart
          title="Energy Usage by Zone"
          type="bar"
          data={energyData}
          xDataKey="zone"
          dataKeys={[{ key: "energy", color: "#f59e0b", name: "Energy (kWh)" }]}
        />
      </div>
      <AppDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingZone ? "Edit Zone" : "Add Zone"}
        footer={<Button onClick={handleSubmit}>{editingZone ? "Save Changes" : "Add Zone"}</Button>}
      >
        <div className="space-y-4">
          <Input placeholder="Zone Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
          <Select value={status} onValueChange={(val) => setStatus(val as "active" | "inactive")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Devices" value={devices} onChange={(e) => setDevices(Number(e.target.value))} />
        </div>
      </AppDialog>
    </div>
  );
}









