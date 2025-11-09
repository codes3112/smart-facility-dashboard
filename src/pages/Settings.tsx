import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';
import AppCard from '@/components/AppCard';
import { useEffect } from 'react';
export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    // ---- SETTINGS STATE ----
    const [user, setUser] = React.useState({
        name: 'Sneha Arora',
        email: 'sneha@example.com',
    });
    const [appearance, setAppearance] = React.useState({
        darkMode: theme === 'dark',
        fontSize: 'Medium',
        layout: 'Cards',
    });

    // Sync appearance.darkMode with theme context
    useEffect(() => {
        setAppearance((prev) => ({ ...prev, darkMode: theme === 'dark' }));
    }, [theme]);
    const [notifications, setNotifications] = React.useState({
        email: true,
        push: false,
        frequency: 'Daily',
    });
    const [facility, setFacility] = React.useState({
        units: 'kWh',
        timezone: 'EST',
        defaultDashboard: 'Main Overview',
    });
    const defaultSettings = {
        appearance: { darkMode: false, fontSize: 'Medium', layout: 'Cards' },
        notifications: { email: true, push: false, frequency: 'Daily' },
        facility: { units: 'kWh', timezone: 'UTC', defaultDashboard: 'Main' },
    };
    // ---- HANDLERS ----
    const handleSave = () => {
        console.log('Saved settings:', { user, appearance, notifications, facility });
    };
    const handleReset = () => {
        setAppearance(defaultSettings.appearance);
        setNotifications(defaultSettings.notifications);
        setFacility(defaultSettings.facility);
    };
    const toggleDarkMode = (value: boolean) => {
        setAppearance((prev) => ({ ...prev, darkMode: value }));
        setTheme(value ? 'dark' : 'light');
    };
    // ---- RENDER ----
    return (
        <div className="container max-w-3xl mx-auto p-6 space-y-6">
            {/* USER ACCOUNT */}
            <AppCard title="User Account">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary">Change Password</Button>
                        <Button variant="destructive">Logout</Button>
                    </div>
                </div>
            </AppCard>
            {/* APPEARANCE */}
            <AppCard title="Theme & Appearance">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Dark Mode</Label>
                        <Switch checked={appearance.darkMode} onCheckedChange={toggleDarkMode} />
                    </div>
                    <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select
                            value={appearance.fontSize}
                            onValueChange={(v) => setAppearance({ ...appearance, fontSize: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Small">Small</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Dashboard Layout</Label>
                        <Select
                            value={appearance.layout}
                            onValueChange={(v) => setAppearance({ ...appearance, layout: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select layout" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Cards">Cards</SelectItem>
                                <SelectItem value="Grid">Grid</SelectItem>
                                <SelectItem value="Compact">Compact</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </AppCard>
            {/* NOTIFICATIONS */}
            <AppCard title="Notifications">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Email Notifications</Label>
                        <Switch
                            checked={notifications.email}
                            onCheckedChange={(v) => setNotifications({ ...notifications, email: v })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Push Notifications</Label>
                        <Switch
                            checked={notifications.push}
                            onCheckedChange={(v) => setNotifications({ ...notifications, push: v })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select
                            value={notifications.frequency}
                            onValueChange={(v) => setNotifications({ ...notifications, frequency: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Real-time">Real-time</SelectItem>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </AppCard>
            {/* FACILITY SETTINGS */}
            <AppCard title="Energy / Facility Settings">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Units</Label>
                        <Select
                            value={facility.units}
                            onValueChange={(v) => setFacility({ ...facility, units: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select units" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kWh">kWh</SelectItem>
                                <SelectItem value="MWh">MWh</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select
                            value={facility.timezone}
                            onValueChange={(v) => setFacility({ ...facility, timezone: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="EST">EST</SelectItem>
                                <SelectItem value="CST">CST</SelectItem>
                                <SelectItem value="PST">PST</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Default Dashboard</Label>
                        <Select
                            value={facility.defaultDashboard}
                            onValueChange={(v) => setFacility({ ...facility, defaultDashboard: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select dashboard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Main Overview">Main Overview</SelectItem>
                                <SelectItem value="Zones">Zones</SelectItem>
                                <SelectItem value="Reports">Reports</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </AppCard>
            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleReset}>
                    Reset Defaults
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
            <Separator />
            {/* ABOUT */}
            <AppCard title="About">
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                <div className="mt-2 flex flex-col space-y-1">
                    <Button variant="link" className="w-fit p-0">Privacy Policy</Button>
                    <Button variant="link" className="w-fit p-0">Contact Support</Button>
                </div>
            </AppCard>
        </div>
    );
}