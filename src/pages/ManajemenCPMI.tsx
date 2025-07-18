import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterBar } from "@/components/filters/FilterBar";
import { Plus, Search, Users, UserCheck, UserX, Download } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface ManajemenCPMIProps {
  userRole?: UserRole;
  userName?: string;
}

export function ManajemenCPMI({ userRole = "admin", userName = "User" }: ManajemenCPMIProps) {
  const cpmiData = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@email.com",
      phone: "081234567890",
      kelas: "Batch 2024-A",
      status: "Aktif",
      negara_tujuan: "Arab Saudi",
      tanggal_masuk: "2024-01-10",
      progress: 75,
      avatar: "/avatars/ahmad.jpg"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      phone: "081234567891",
      kelas: "Batch 2024-A",
      status: "Piket",
      negara_tujuan: "Malaysia",
      tanggal_masuk: "2024-01-10",
      progress: 80,
      avatar: "/avatars/siti.jpg"
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      phone: "081234567892",
      kelas: "Batch 2024-B",
      status: "Sudah Terbang",
      negara_tujuan: "Kuwait",
      tanggal_masuk: "2023-10-15",
      progress: 100,
      avatar: "/avatars/budi.jpg"
    },
    {
      id: 4,
      name: "Dewi Sartika",
      email: "dewi.sartika@email.com",
      phone: "081234567893",
      kelas: "Batch 2024-A",
      status: "Aktif",
      negara_tujuan: "Singapura",
      tanggal_masuk: "2024-01-10",
      progress: 65,
      avatar: "/avatars/dewi.jpg"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "Piket":
        return <Badge className="bg-blue-100 text-blue-800">Piket</Badge>;
      case "Sudah Terbang":
        return <Badge className="bg-purple-100 text-purple-800">Sudah Terbang</Badge>;
      case "Non-Aktif":
        return <Badge className="bg-red-100 text-red-800">Non-Aktif</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "Semua Status" },
        { value: "aktif", label: "Aktif" },
        { value: "piket", label: "Piket" },
        { value: "sudah_terbang", label: "Sudah Terbang" },
        { value: "non_aktif", label: "Non-Aktif" }
      ]
    },
    {
      key: "kelas",
      label: "Kelas",
      options: [
        { value: "all", label: "Semua Kelas" },
        { value: "batch_2024_a", label: "Batch 2024-A" },
        { value: "batch_2024_b", label: "Batch 2024-B" },
        { value: "batch_2023_c", label: "Batch 2023-C" }
      ]
    },
    {
      key: "negara",
      label: "Negara Tujuan",
      options: [
        { value: "all", label: "Semua Negara" },
        { value: "arab_saudi", label: "Arab Saudi" },
        { value: "malaysia", label: "Malaysia" },
        { value: "kuwait", label: "Kuwait" },
        { value: "singapura", label: "Singapura" }
      ]
    }
  ];

  const totalCPMI = cpmiData.length;
  const aktiveCPMI = cpmiData.filter(c => c.status === "Aktif").length;
  const piketCPMI = cpmiData.filter(c => c.status === "Piket").length;
  const sudahTerbang = cpmiData.filter(c => c.status === "Sudah Terbang").length;

  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manajemen CPMI</h1>
            <p className="text-muted-foreground">Kelola data dan status CPMI</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah CPMI
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total CPMI</p>
                  <p className="text-2xl font-bold text-blue-600">{totalCPMI}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktif</p>
                  <p className="text-2xl font-bold text-green-600">{aktiveCPMI}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Piket</p>
                  <p className="text-2xl font-bold text-blue-600">{piketCPMI}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sudah Terbang</p>
                  <p className="text-2xl font-bold text-purple-600">{sudahTerbang}</p>
                </div>
                <UserX className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari CPMI berdasarkan nama, email, atau phone..."
                  className="pl-10"
                />
              </div>
              <FilterBar 
                options={filterOptions}
                onFilterChange={(filters) => console.log('Filters:', filters)}
              />
            </div>
          </CardContent>
        </Card>

        {/* CPMI List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar CPMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cpmiData.map((cpmi) => (
                <div key={cpmi.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={cpmi.avatar} />
                        <AvatarFallback>{cpmi.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{cpmi.name}</h3>
                        <p className="text-sm text-muted-foreground">{cpmi.email}</p>
                        <p className="text-sm text-muted-foreground">{cpmi.phone}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{cpmi.kelas}</Badge>
                          <Badge variant="outline">{cpmi.negara_tujuan}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(cpmi.status)}
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${cpmi.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{cpmi.progress}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
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