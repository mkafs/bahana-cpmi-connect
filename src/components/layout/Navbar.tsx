import { useState } from "react";
import { Bell, Menu, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserRole } from "@/types/auth";

interface NavbarProps {
  userRole?: UserRole;
  userName?: string;
  onMenuToggle?: () => void;
  notificationCount?: number;
}

const getRoleColor = (role: UserRole) => {
  const colors = {
    superadmin: "superadmin",
    admin: "admin", 
    pengajar: "pengajar",
    cpmi: "cpmi"
  };
  return colors[role];
};

const getRoleLabel = (role: UserRole) => {
  const labels = {
    superadmin: "Super Admin",
    admin: "Admin",
    pengajar: "Pengajar", 
    cpmi: "CPMI"
  };
  return labels[role];
};

export function Navbar({ userRole = "cpmi", userName = "User", onMenuToggle, notificationCount = 0 }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">LPK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">LPK Bahana Mega Prestasi</h1>
              <p className="text-xs text-muted-foreground">Sistem Manajemen CPMI</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari data, laporan, atau notifikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-auto px-3 gap-3">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="text-xs">
                    {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <Badge variant={getRoleColor(userRole) as any} className="text-xs px-2 py-0">
                    {getRoleLabel(userRole)}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {getRoleLabel(userRole)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}