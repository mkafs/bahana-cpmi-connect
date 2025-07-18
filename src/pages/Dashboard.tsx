import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  BookOpen, 
  Calendar,
  MapPin,
  Clock,
  TrendingUp
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FilterBar } from "@/components/filters/FilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserRole } from "@/types/auth";

interface CPMIData {
  id: string;
  status: 'aktif' | 'piket' | 'sudah_terbang';
  class_id?: string;
  no_peserta?: string;
  tanggal_masuk?: string;
  tanggal_terbang?: string;
  alamat?: string;
  user_id: string;
}

interface DashboardProps {
  userRole?: UserRole;
  userName?: string;
  cpmiData?: CPMIData | null;
}

// Mock data - replace with real data from your API
const mockStats = {
  superadmin: [
    { title: "Total CPMI", value: 240, icon: Users, variant: "default" as const },
    { title: "CPMI Aktif", value: 180, icon: UserCheck, variant: "success" as const },
    { title: "CPMI Piket", value: 45, icon: ClipboardList, variant: "warning" as const },
    { title: "Sudah Terbang", value: 15, icon: TrendingUp, variant: "default" as const },
  ],
  admin: [
    { title: "Hadir Hari Ini", value: 167, icon: UserCheck, variant: "success" as const },
    { title: "Laporan Piket", value: 12, icon: ClipboardList, variant: "default" as const },
    { title: "Notifikasi Baru", value: 8, icon: Calendar, variant: "warning" as const },
    { title: "Pesan Masuk", value: 23, icon: BookOpen, variant: "default" as const },
  ],
  pengajar: [
    { title: "Kelas Saya", value: 3, icon: BookOpen, variant: "default" as const },
    { title: "Pelajaran Hari Ini", value: 4, icon: Clock, variant: "success" as const },
    { title: "CPMI Hadir", value: 45, icon: UserCheck, variant: "success" as const },
    { title: "Pesan Baru", value: 7, icon: Calendar, variant: "warning" as const },
  ],
  cpmi: [
    { title: "Kehadiran Bulan Ini", value: "18/20", icon: UserCheck, variant: "success" as const },
    { title: "Pelajaran Hari Ini", value: 3, icon: BookOpen, variant: "default" as const },
    { title: "Tugas Piket", value: "Tidak", icon: ClipboardList, variant: "success" as const },
    { title: "Pesan Baru", value: 2, icon: Calendar, variant: "warning" as const },
  ],
};

const recentActivities = [
  {
    id: 1,
    user: "Ahmad Fauzi",
    action: "Melakukan absensi",
    time: "8:15 AM",
    location: "Lab Komputer",
    type: "absensi"
  },
  {
    id: 2,
    user: "Siti Nurhaliza", 
    action: "Mengirim laporan piket",
    time: "7:45 AM",
    location: "Ruang Kelas A",
    type: "piket"
  },
  {
    id: 3,
    user: "Budi Santoso",
    action: "Mengupload materi pelajaran",
    time: "7:30 AM",
    location: "Bahasa Inggris",
    type: "pelajaran"
  },
];

const todaySchedule = [
  {
    id: 1,
    time: "08:00 - 09:30",
    subject: "Bahasa Inggris",
    teacher: "Mrs. Sarah",
    room: "Ruang A",
    status: "upcoming"
  },
  {
    id: 2,
    time: "10:00 - 11:30",
    subject: "Komputer Dasar",
    teacher: "Mr. Ahmad", 
    room: "Lab Komputer",
    status: "current"
  },
  {
    id: 3,
    time: "13:00 - 14:30",
    subject: "Budaya Kerja",
    teacher: "Mrs. Linda",
    room: "Ruang B",
    status: "upcoming"
  },
];

export function Dashboard({ userRole = "cpmi", userName = "User", cpmiData }: DashboardProps) {
  const [filters, setFilters] = useState({});
  
  // Dynamic stats based on CPMI status
  const getCPMIStats = () => {
    if (userRole === "cpmi" && cpmiData) {
      if (cpmiData.status === "aktif") {
        return [
          { title: "Kehadiran Bulan Ini", value: "18/20", icon: UserCheck, variant: "success" as const },
          { title: "Pelajaran Hari Ini", value: 3, icon: BookOpen, variant: "default" as const },
          { title: "Status", value: "Aktif Belajar", icon: UserCheck, variant: "success" as const },
          { title: "Pesan Baru", value: 2, icon: Calendar, variant: "default" as const }
        ];
      } else if (cpmiData.status === "piket") {
        return [
          { title: "Kehadiran Bulan Ini", value: "18/20", icon: UserCheck, variant: "success" as const },
          { title: "Status", value: "Tugas Piket", icon: ClipboardList, variant: "default" as const },
          { title: "Shift Piket", value: "Pagi", icon: Clock, variant: "default" as const },
          { title: "Laporan Piket", value: 3, icon: ClipboardList, variant: "default" as const }
        ];
      } else if (cpmiData.status === "sudah_terbang") {
        return [
          { title: "Total Kehadiran", value: "20/20", icon: UserCheck, variant: "success" as const },
          { title: "Status", value: "Sudah Terbang", icon: TrendingUp, variant: "success" as const },
          { title: "Tanggal Terbang", value: cpmiData.tanggal_terbang || "-", icon: Calendar, variant: "default" as const },
          { title: "Program Selesai", value: "100%", icon: BookOpen, variant: "success" as const }
        ];
      }
    }
    return mockStats[userRole] || mockStats.cpmi;
  };

  const stats = getCPMIStats();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge variant="success">Sedang Berlangsung</Badge>;
      case "upcoming":
        return <Badge variant="default">Akan Datang</Badge>;
      case "completed":
        return <Badge variant="secondary">Selesai</Badge>;
      default:
        return null;
    }
  };

  // Filter activities based on CPMI status
  const getFilteredActivities = () => {
    if (userRole === "cpmi" && cpmiData) {
      if (cpmiData.status === "aktif") {
        return recentActivities.filter(activity => activity.type === "absensi" || activity.type === "pelajaran");
      } else if (cpmiData.status === "piket") {
        return recentActivities.filter(activity => activity.type === "piket");
      }
      return recentActivities;
    }
    return recentActivities;
  };

  const filteredActivities = getFilteredActivities();

  return (
    <MainLayout userRole={userRole} userName={userName} cpmiStatus={cpmiData?.status || null}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-white/90">
            {userRole === "cpmi" && cpmiData && cpmiData.status === "aktif" && "Semangat belajar hari ini! Jangan lupa melakukan absensi."}
            {userRole === "cpmi" && cpmiData && cpmiData.status === "piket" && "Hari ini Anda bertugas piket. Pastikan menjalankan tugas dengan baik!"}
            {userRole === "cpmi" && cpmiData && cpmiData.status === "sudah_terbang" && "Selamat! Anda telah menyelesaikan program dan sudah terbang."}
            {userRole === "cpmi" && !cpmiData && "Selamat datang di sistem CPMI!"}
            {userRole === "pengajar" && "Mari mulai mengajar dengan semangat hari ini!"}
            {userRole === "admin" && "Pantau aktivitas CPMI dan kelola sistem dengan efisien."}
            {userRole === "superadmin" && "Kelola seluruh sistem dan pastikan semua berjalan lancar."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Filter Bar */}
        {(userRole === "admin" || userRole === "superadmin") && (
          <FilterBar
            onFiltersChange={setFilters}
            placeholder="Cari CPMI, pelajaran, atau aktivitas..."
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {userRole === "cpmi" && cpmiData?.status === "piket" ? "Aktivitas Piket" : "Aktivitas Terbaru"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.location}</span>
                      </div>
                    </div>
                    <Badge variant={
                      activity.type === "absensi" ? "success" :
                      activity.type === "piket" ? "warning" : "default"
                    } className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule or Piket Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {userRole === "cpmi" && cpmiData?.status === "piket" ? "Jadwal Piket Hari Ini" : "Jadwal Hari Ini"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule) => (
                  <div key={schedule.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="text-center min-w-0">
                      <p className="text-sm font-medium">{schedule.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{schedule.subject}</p>
                      <p className="text-sm text-muted-foreground">{schedule.teacher}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{schedule.room}</span>
                      </div>
                    </div>
                    {getStatusBadge(schedule.status)}
                  </div>
                ))}
              </div>
              
              {userRole === "cpmi" && cpmiData?.status === "aktif" && (
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full" variant="default">
                    <MapPin className="h-4 w-4 mr-2" />
                    Lakukan Absensi Sekarang
                  </Button>
                </div>
              )}

              {userRole === "cpmi" && cpmiData?.status === "piket" && (
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full" variant="default">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Lapor Tugas Piket
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}