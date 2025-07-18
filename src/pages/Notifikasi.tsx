import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Trash2, Calendar, MessageSquare, BookOpen, Users } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface NotifikasiProps {
  userRole?: UserRole;
  userName?: string;
}

export function Notifikasi({ userRole = "cpmi", userName = "User" }: NotifikasiProps) {
  const notifications = [
    {
      id: 1,
      type: "jadwal",
      title: "Jadwal Pelajaran Diperbarui",
      message: "Mata pelajaran Bahasa Arab dipindah ke jam 10:00",
      time: "5 menit yang lalu",
      isRead: false,
      icon: Calendar,
      priority: "medium"
    },
    {
      id: 2,
      type: "pesan",
      title: "Pesan Baru dari Ustadz Muhammad",
      message: "Tugas untuk minggu depan sudah siap",
      time: "15 menit yang lalu",
      isRead: false,
      icon: MessageSquare,
      priority: "high"
    },
    {
      id: 3,
      type: "pengumuman",
      title: "Pengumuman Ujian Tengah Semester",
      message: "Ujian akan dilaksanakan tanggal 25 Januari 2024",
      time: "1 jam yang lalu",
      isRead: true,
      icon: BookOpen,
      priority: "high"
    },
    {
      id: 4,
      type: "absensi",
      title: "Reminder Absensi",
      message: "Jangan lupa absen masuk hari ini",
      time: "2 jam yang lalu",
      isRead: true,
      icon: Users,
      priority: "low"
    },
    {
      id: 5,
      type: "piket",
      title: "Jadwal Piket Minggu Ini",
      message: "Anda bertugas piket hari Rabu shift siang",
      time: "1 hari yang lalu",
      isRead: true,
      icon: Calendar,
      priority: "medium"
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Penting</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Sedang</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Rendah</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "jadwal":
        return Calendar;
      case "pesan":
        return MessageSquare;
      case "pengumuman":
        return BookOpen;
      case "absensi":
        return Users;
      case "piket":
        return Calendar;
      default:
        return Bell;
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifikasi</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <CheckCheck className="h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Hapus Semua
            </Button>
          </div>
        </div>

        {/* Notification Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Notifikasi</p>
                  <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Belum Dibaca</p>
                  <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Penting</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {notifications.filter(n => n.priority === 'high').length}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hari Ini</p>
                  <p className="text-2xl font-bold text-green-600">4</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Semua Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = getTypeIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-colors hover:bg-muted/50 ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        !notification.isRead ? 'bg-blue-100' : 'bg-muted'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${
                              !notification.isRead ? 'text-blue-900' : 'text-foreground'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <Badge className="bg-blue-500 text-white">Baru</Badge>
                            )}
                          </div>
                          {getPriorityBadge(notification.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button variant="outline" size="sm">
                            <CheckCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}