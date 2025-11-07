import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/pages/Dashboard";
import Zones from "@/pages/Zones";
import Login from "@/pages/Login";
import Reports from "@/pages/Reports";
import PrivateRoute from "@/routes/PrivateRoute";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };
  // Show Sidebar + Header ONLY if not on /login
  const showLayout = location.pathname !== "/login";
  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      {showLayout && <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />}
      <div className={`flex-1 flex flex-col ${showLayout ? "md:ml-64" : ""}`}>
        {showLayout && (
          <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />
        )}
        <main className="flex-1 overflow-y-auto">
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
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
