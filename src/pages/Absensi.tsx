import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface AbsensiProps {
  userRole?: UserRole;
  userName?: string;
}

export function Absensi({ userRole = "cpmi", userName = "User" }: AbsensiProps) {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const attendanceData = [
    { date: "2024-01-15", status: "Hadir", time: "07:45", location: "Ruang Kelas A" },
    { date: "2024-01-14", status: "Hadir", time: "07:30", location: "Ruang Kelas A" },
    { date: "2024-01-13", status: "Terlambat", time: "08:15", location: "Ruang Kelas A" },
    { date: "2024-01-12", status: "Hadir", time: "07:40", location: "Ruang Kelas A" },
    { date: "2024-01-11", status: "Izin", time: "-", location: "-" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hadir":
        return <Badge className="bg-green-100 text-green-800">Hadir</Badge>;
      case "Terlambat":
        return <Badge className="bg-yellow-100 text-yellow-800">Terlambat</Badge>;
      case "Izin":
        return <Badge className="bg-blue-100 text-blue-800">Izin</Badge>;
      case "Alpha":
        return <Badge className="bg-red-100 text-red-800">Alpha</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Absensi</h1>
            <p className="text-muted-foreground">Kelola absensi harian Anda</p>
          </div>
        </div>

        {/* Check-in Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Absen Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium">{currentDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Waktu Sekarang</p>
                <p className="font-medium">{currentTime}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-gray-100 text-gray-800">Belum Absen</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Absen Masuk
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Absen Keluar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hadir</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Terlambat</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Izin</p>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alpha</p>
                  <p className="text-2xl font-bold text-red-600">0</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Absensi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{new Date(record.date).toLocaleDateString('id-ID')}</p>
                      <p className="text-sm text-muted-foreground">{record.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{record.time}</p>
                      <p className="text-sm text-muted-foreground">Waktu Absen</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}