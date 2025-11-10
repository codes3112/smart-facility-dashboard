import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {useAuth} from './../context/AuthContext'

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Zones", path: "/zones" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Hamburger button fixed at top-left for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
        onClick={onToggle}
      >
        ☰
      </button>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-slate-900 p-5 z-50
          transform transition-transform duration-300
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center my-8 md:hidden">
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">
              {user?.name || 'Guest'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {user?.email || 'Not logged in'}
            </p>
          </div>
          <button
            className="p-2 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            onClick={onToggle}
          >
            ✕
          </button>
        </div>
        {/* Logo / Title for desktop */}
        <div className="hidden md:block my-8">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            {user?.name || 'Guest'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {user?.email || 'Not logged in'}
          </p>
        </div>
        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => { if (window.innerWidth < 768) onToggle(); }}>
              <Button
                variant={location.pathname === item.path ? "default" : "outline"}
                className="w-full justify-start"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}









