import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  BarChart3,
  MapPin,
  ClipboardList,
  Bell,
  UserCheck,
  GraduationCap,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/auth";

interface SidebarProps {
  userRole?: UserRole;
  isCollapsed?: boolean;
  onToggle?: () => void;
  cpmiStatus?: 'aktif' | 'piket' | 'sudah_terbang' | null;
}

interface MenuItem {
  title: string;
  href: string;
  icon: any;
  roles: UserRole[];
  badge?: number;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    roles: ["superadmin", "admin", "pengajar", "cpmi"]
  },
  {
    title: "Absensi",
    href: "/absensi",
    icon: MapPin,
    roles: ["superadmin", "admin", "pengajar", "cpmi"]
  },
  {
    title: "Laporan Piket",
    href: "/piket",
    icon: ClipboardList,
    roles: ["superadmin", "admin", "pengajar", "cpmi"]
  },
  {
    title: "Jadwal & Pelajaran",
    href: "/pelajaran",
    icon: BookOpen,
    roles: ["superadmin", "admin", "pengajar", "cpmi"]
  },
  {
    title: "Pesan",
    href: "/pesan",
    icon: MessageSquare,
    roles: ["superadmin", "admin", "pengajar", "cpmi"],
    badge: 3
  },
  {
    title: "Notifikasi",
    href: "/notifikasi",
    icon: Bell,
    roles: ["superadmin", "admin", "pengajar", "cpmi"]
  },
  {
    title: "Manajemen CPMI",
    href: "/cpmi",
    icon: Users,
    roles: ["superadmin", "admin"]
  },
  {
    title: "Manajemen Kelas",
    href: "/kelas",
    icon: GraduationCap,
    roles: ["superadmin", "admin"]
  },
  {
    title: "Laporan",
    href: "/laporan",
    icon: BarChart3,
    roles: ["superadmin", "admin", "pengajar"]
  },
  {
    title: "Pengaturan",
    href: "/pengaturan",
    icon: Settings,
    roles: ["superadmin", "admin"]
  }
];

export function Sidebar({ userRole = "cpmi", isCollapsed = false, onToggle, cpmiStatus }: SidebarProps) {
  const location = useLocation();
  
  const getFilteredMenuItems = () => {
    let filteredItems = menuItems.filter(item => item.roles.includes(userRole));
    
    // Filter based on CPMI status
    if (userRole === "cpmi" && cpmiStatus) {
      if (cpmiStatus === "aktif") {
        // Active CPMI can see absensi but not piket
        filteredItems = filteredItems.filter(item => 
          item.href !== "/piket"
        );
      } else if (cpmiStatus === "piket") {
        // Piket CPMI can see piket but not absensi
        filteredItems = filteredItems.filter(item => 
          item.href !== "/absensi"
        );
      } else if (cpmiStatus === "sudah_terbang") {
        // Graduated CPMI has read-only access
        filteredItems = filteredItems.filter(item => 
          item.href === "/" || item.href === "/pelajaran" || item.href === "/pesan"
        );
      }
    }
    
    return filteredItems;
  };

  const filteredMenuItems = getFilteredMenuItems();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Role Indicator */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-3 w-3 rounded-full",
              userRole === "superadmin" && "bg-superadmin",
              userRole === "admin" && "bg-admin",
              userRole === "pengajar" && "bg-pengajar",
              userRole === "cpmi" && "bg-cpmi"
            )} />
            <span className="text-sm font-medium capitalize">
              {userRole === "pengajar" ? "Pengajar" : userRole.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}