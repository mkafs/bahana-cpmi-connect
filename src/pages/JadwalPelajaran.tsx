import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Clock, Users, Calendar } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface JadwalPelajaranProps {
  userRole?: UserRole;
  userName?: string;
}

export function JadwalPelajaran({ userRole = "cpmi", userName = "User" }: JadwalPelajaranProps) {
  const todaySchedule = [
    {
      time: "08:00 - 10:00",
      subject: "Bahasa Arab",
      teacher: "Ustadz Muhammad",
      room: "Kelas A",
      status: "Selesai"
    },
    {
      time: "10:30 - 12:00",
      subject: "Etika & Budaya",
      teacher: "Ustadzah Fatimah",
      room: "Kelas A",
      status: "Berlangsung"
    },
    {
      time: "13:00 - 15:00",
      subject: "Keterampilan Rumah Tangga",
      teacher: "Ibu Sari",
      room: "Lab Praktik",
      status: "Akan Datang"
    },
    {
      time: "15:30 - 17:00",
      subject: "Bahasa Inggris",
      teacher: "Mr. John",
      room: "Kelas B",
      status: "Akan Datang"
    }
  ];

  const weeklySubjects = [
    {
      name: "Bahasa Arab",
      sessions: 8,
      teacher: "Ustadz Muhammad",
      progress: 75
    },
    {
      name: "Etika & Budaya",
      sessions: 6,
      teacher: "Ustadzah Fatimah",
      progress: 60
    },
    {
      name: "Keterampilan Rumah Tangga",
      sessions: 10,
      teacher: "Ibu Sari",
      progress: 80
    },
    {
      name: "Bahasa Inggris",
      sessions: 6,
      teacher: "Mr. John",
      progress: 45
    },
    {
      name: "Komputer Dasar",
      sessions: 4,
      teacher: "Pak Budi",
      progress: 30
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selesai":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "Berlangsung":
        return <Badge className="bg-blue-100 text-blue-800">Berlangsung</Badge>;
      case "Akan Datang":
        return <Badge className="bg-gray-100 text-gray-800">Akan Datang</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Jadwal & Pelajaran</h1>
            <p className="text-muted-foreground">Kelola jadwal dan materi pembelajaran</p>
          </div>
          {(userRole === "admin" || userRole === "superadmin" || userRole === "pengajar") && (
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Buat Jadwal
            </Button>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Mata Pelajaran</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Jam Hari Ini</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pengajar Aktif</p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progress Rata-rata</p>
                  <p className="text-2xl font-bold text-orange-600">68%</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Jadwal Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-[100px]">
                      <p className="font-medium text-sm">{schedule.time}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">{schedule.subject}</h3>
                      <p className="text-sm text-muted-foreground">{schedule.teacher} • {schedule.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(schedule.status)}
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Subjects Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Mata Pelajaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySubjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.teacher} • {subject.sessions} sesi</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{subject.progress}%</p>
                      <p className="text-xs text-muted-foreground">Selesai</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Lihat Materi
                    </Button>
                    <Button variant="outline" size="sm">
                      Riwayat
                    </Button>
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