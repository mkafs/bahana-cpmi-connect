import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, BookOpen, Calendar, GraduationCap } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface ManajemenKelasProps {
  userRole?: UserRole;
  userName?: string;
}

export function ManajemenKelas({ userRole = "admin", userName = "User" }: ManajemenKelasProps) {
  const kelasData = [
    {
      id: 1,
      nama: "Batch 2024-A",
      kapasitas: 30,
      jumlah_siswa: 25,
      pengajar: "Ustadz Muhammad",
      periode: "Jan - Jun 2024",
      status: "Aktif",
      progress: 60,
      mata_pelajaran: ["Bahasa Arab", "Etika & Budaya", "Keterampilan RT"],
      mulai: "2024-01-10",
      selesai: "2024-06-30"
    },
    {
      id: 2,
      nama: "Batch 2024-B",
      kapasitas: 25,
      jumlah_siswa: 20,
      pengajar: "Ustadzah Fatimah",
      periode: "Feb - Jul 2024",
      status: "Aktif",
      progress: 45,
      mata_pelajaran: ["Bahasa Inggris", "Komputer Dasar", "Kesehatan"],
      mulai: "2024-02-01",
      selesai: "2024-07-31"
    },
    {
      id: 3,
      nama: "Batch 2023-C",
      kapasitas: 30,
      jumlah_siswa: 28,
      pengajar: "Ibu Sari",
      periode: "Aug 2023 - Jan 2024",
      status: "Selesai",
      progress: 100,
      mata_pelajaran: ["Bahasa Arab", "Keterampilan RT", "Etika"],
      mulai: "2023-08-15",
      selesai: "2024-01-15"
    },
    {
      id: 4,
      nama: "Batch 2024-C",
      kapasitas: 35,
      jumlah_siswa: 0,
      pengajar: "Mr. John",
      periode: "Mar - Aug 2024",
      status: "Persiapan",
      progress: 0,
      mata_pelajaran: ["Bahasa Inggris", "Komputer", "Komunikasi"],
      mulai: "2024-03-01",
      selesai: "2024-08-31"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "Selesai":
        return <Badge className="bg-blue-100 text-blue-800">Selesai</Badge>;
      case "Persiapan":
        return <Badge className="bg-yellow-100 text-yellow-800">Persiapan</Badge>;
      case "Ditunda":
        return <Badge className="bg-red-100 text-red-800">Ditunda</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalKelas = kelasData.length;
  const kelasAktif = kelasData.filter(k => k.status === "Aktif").length;
  const totalSiswa = kelasData.reduce((sum, k) => sum + k.jumlah_siswa, 0);
  const avgProgress = Math.round(kelasData.reduce((sum, k) => sum + k.progress, 0) / kelasData.length);

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manajemen Kelas</h1>
            <p className="text-muted-foreground">Kelola kelas dan batch pelatihan CPMI</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buat Kelas Baru
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Kelas</p>
                  <p className="text-2xl font-bold text-blue-600">{totalKelas}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Kelas Aktif</p>
                  <p className="text-2xl font-bold text-green-600">{kelasAktif}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Siswa</p>
                  <p className="text-2xl font-bold text-purple-600">{totalSiswa}</p>
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
                  <p className="text-2xl font-bold text-orange-600">{avgProgress}%</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kelas List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {kelasData.map((kelas) => (
            <Card key={kelas.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{kelas.nama}</CardTitle>
                    <p className="text-sm text-muted-foreground">{kelas.periode}</p>
                  </div>
                  {getStatusBadge(kelas.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informasi Dasar */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Pengajar</p>
                    <p className="font-medium">{kelas.pengajar}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Siswa</p>
                    <p className="font-medium">{kelas.jumlah_siswa}/{kelas.kapasitas}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Progress Kelas</p>
                    <p className="text-sm font-medium">{kelas.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${kelas.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Mata Pelajaran */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Mata Pelajaran</p>
                  <div className="flex flex-wrap gap-1">
                    {kelas.mata_pelajaran.map((mapel, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {mapel}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Periode */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Mulai</p>
                    <p className="font-medium">{new Date(kelas.mulai).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Selesai</p>
                    <p className="font-medium">{new Date(kelas.selesai).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Lihat Detail
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit Kelas
                  </Button>
                  {kelas.status === "Aktif" && (
                    <Button size="sm" className="flex-1">
                      Kelola
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}