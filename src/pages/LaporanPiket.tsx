import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, Users } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface LaporanPiketProps {
  userRole?: UserRole;
  userName?: string;
}

export function LaporanPiket({ userRole = "cpmi", userName = "User" }: LaporanPiketProps) {
  const piketReports = [
    {
      id: 1,
      date: "2024-01-15",
      shift: "Pagi",
      petugas: "Ahmad Fauzi",
      kegiatan: "Membersihkan ruang kelas A, menyapu halaman, mengatur meja kursi",
      status: "Selesai",
      waktu: "06:00 - 08:00"
    },
    {
      id: 2,
      date: "2024-01-14",
      shift: "Siang",
      petugas: "Siti Nurhaliza",
      kegiatan: "Membersihkan toilet, menyapu koridor, membuang sampah",
      status: "Selesai",
      waktu: "12:00 - 14:00"
    },
    {
      id: 3,
      date: "2024-01-13",
      shift: "Sore",
      petugas: "Budi Santoso",
      kegiatan: "Menyapu halaman, mengepel lantai, mengunci ruangan",
      status: "Pending",
      waktu: "16:00 - 18:00"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selesai":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Belum Mulai":
        return <Badge className="bg-gray-100 text-gray-800">Belum Mulai</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Laporan Piket</h1>
            <p className="text-muted-foreground">Kelola dan pantau jadwal piket harian</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buat Laporan
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Laporan</p>
                  <p className="text-2xl font-bold text-blue-600">24</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selesai</p>
                  <p className="text-2xl font-bold text-green-600">20</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Belum Mulai</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
                <FileText className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Jadwal Piket Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Shift Pagi</h3>
                    <p className="text-sm text-muted-foreground">06:00 - 08:00</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Selesai</Badge>
                </div>
                <p className="text-sm">Petugas: Ahmad Fauzi</p>
                <p className="text-sm text-muted-foreground">Ruang Kelas A & Halaman</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Shift Siang</h3>
                    <p className="text-sm text-muted-foreground">12:00 - 14:00</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Berlangsung</Badge>
                </div>
                <p className="text-sm">Petugas: Siti Nurhaliza</p>
                <p className="text-sm text-muted-foreground">Toilet & Koridor</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">Shift Sore</h3>
                    <p className="text-sm text-muted-foreground">16:00 - 18:00</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">Belum Mulai</Badge>
                </div>
                <p className="text-sm">Petugas: Budi Santoso</p>
                <p className="text-sm text-muted-foreground">Halaman & Penguncian</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Laporan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {piketReports.map((report) => (
                <div key={report.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{report.shift} - {new Date(report.date).toLocaleDateString('id-ID')}</h3>
                      <p className="text-sm text-muted-foreground">{report.waktu}</p>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Petugas:</span> {report.petugas}</p>
                    <p className="text-sm"><span className="font-medium">Kegiatan:</span> {report.kegiatan}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                    {report.status === "Pending" && (
                      <Button size="sm">
                        Tandai Selesai
                      </Button>
                    )}
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