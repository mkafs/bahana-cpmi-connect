import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import type { UserRole } from "@/types/auth";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
}

export function MainLayout({ children, userRole = "cpmi", userName = "User" }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          userRole={userRole} 
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-background border-r z-50 transition-transform lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar userRole={userRole} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          userRole={userRole}
          userName={userName}
          onMenuToggle={toggleMobileSidebar}
          notificationCount={5}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}