import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import Zones from "@/pages/Zones";
import Login from "@/pages/Login";
import Reports from "@/pages/Reports";
import PrivateRoute from "@/routes/PrivateRoute";
import { useLoader } from "./hooks/useLoader";
import AppLoader from "./components/AppLoader";
import { Toaster } from "./components/ui/toaster";
import Settings from "./pages/Settings";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const {loading} = useLoader();
  // Show Sidebar + Header ONLY if not on /login
  const showLayout = location.pathname !== "/login";
  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      {showLayout && <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />}
      <div className={`flex-1 flex flex-col ${showLayout ? "md:ml-64" : ""}`}>
        {showLayout && (
          <Header toggleSidebar={toggleSidebar} />
        )}
        <main className="flex-1 overflow-y-auto">
          <AppLoader loading ={loading}/>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/zones"
              element={
                <PrivateRoute>
                  <Zones />
                </PrivateRoute>
              }
            />
             <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
               <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
          <Toaster/>
        </main>
      </div>
    </div>
  );
}
