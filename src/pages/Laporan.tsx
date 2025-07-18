import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface LaporanProps {
  userRole?: UserRole;
  userName?: string;
}

export function Laporan({ userRole = "admin", userName = "User" }: LaporanProps) {
  const reportTypes = [
    {
      id: 1,
      title: "Laporan Absensi",
      description: "Laporan kehadiran CPMI per periode",
      type: "absensi",
      lastGenerated: "2024-01-15",
      frequency: "Harian",
      icon: Calendar,
      color: "blue"
    },
    {
      id: 2,
      title: "Laporan Progress Pembelajaran",
      description: "Progress pembelajaran per kelas dan individu",
      type: "pembelajaran",
      lastGenerated: "2024-01-14",
      frequency: "Mingguan",
      icon: TrendingUp,
      color: "green"
    },
    {
      id: 3,
      title: "Laporan Piket",
      description: "Laporan aktivitas piket dan kebersihan",
      type: "piket",
      lastGenerated: "2024-01-15",
      frequency: "Harian",
      icon: FileText,
      color: "orange"
    },
    {
      id: 4,
      title: "Laporan CPMI",
      description: "Data statistik dan status CPMI",
      type: "cpmi",
      lastGenerated: "2024-01-10",
      frequency: "Bulanan",
      icon: BarChart3,
      color: "purple"
    },
    {
      id: 5,
      title: "Laporan Kelas",
      description: "Statistik dan performa kelas",
      type: "kelas",
      lastGenerated: "2024-01-12",
      frequency: "Mingguan",
      icon: PieChart,
      color: "red"
    }
  ];

  const recentReports = [
    {
      title: "Laporan Absensi Januari 2024",
      type: "absensi",
      date: "2024-01-15",
      status: "Selesai",
      size: "2.3 MB"
    },
    {
      title: "Progress Pembelajaran Minggu 2",
      type: "pembelajaran",
      date: "2024-01-14",
      status: "Selesai",
      size: "1.8 MB"
    },
    {
      title: "Laporan Piket Harian",
      type: "piket",
      date: "2024-01-15",
      status: "Generate",
      size: "-"
    },
    {
      title: "Statistik CPMI Desember 2023",
      type: "cpmi",
      date: "2024-01-10",
      status: "Selesai",
      size: "3.1 MB"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selesai":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "Generate":
        return <Badge className="bg-yellow-100 text-yellow-800">Generate</Badge>;
      case "Error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "orange":
        return "text-orange-600";
      case "purple":
        return "text-purple-600";
      case "red":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Laporan</h1>
            <p className="text-muted-foreground">Generate dan kelola laporan sistem</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Semua
          </Button>
        </div>

        {/* Report Statistics */}
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
                  <p className="text-sm text-muted-foreground">Bulan Ini</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Otomatis</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Manual</p>
                  <p className="text-2xl font-bold text-orange-600">4</p>
                </div>
                <PieChart className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Types */}
        <Card>
          <CardHeader>
            <CardTitle>Jenis Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <IconComponent className={`h-8 w-8 ${getColorClasses(report.color)}`} />
                      <Badge variant="outline" className="text-xs">
                        {report.frequency}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{report.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {report.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Terakhir: {new Date(report.lastGenerated).toLocaleDateString('id-ID')}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Generate
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Lihat
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(report.date).toLocaleDateString('id-ID')} • {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    <div className="flex gap-2">
                      {report.status === "Selesai" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
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