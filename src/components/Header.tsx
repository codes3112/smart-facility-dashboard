import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
interface HeaderProps {
  toggleSidebar?: () => void; // optional for mobile hamburger
  toggleTheme: () => void; // dark/light mode toggle
}
export default function Header({ toggleSidebar, toggleTheme }: HeaderProps) {
  const { logout, user } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      {/* Left: Hamburger (mobile only) */}
      {toggleSidebar && (
        <Button
          variant="ghost"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          ☰
        </Button>
      )}
      {/* Center: Title */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Smart Facility
      </h1>
      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Dark/Light Toggle */}
        <Button variant="outline" onClick={toggleTheme}>
          Toggle Theme
        </Button>
        {/* User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>{user?.email ? user.email[0].toUpperCase():'SA'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{user?.email}</DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
