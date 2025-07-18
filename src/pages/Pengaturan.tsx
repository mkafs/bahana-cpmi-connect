import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Shield, Bell, Database, Globe } from "lucide-react";
import type { UserRole } from "@/types/auth";

interface PengaturanProps {
  userRole?: UserRole;
  userName?: string;
}

export function Pengaturan({ userRole = "admin", userName = "User" }: PengaturanProps) {
  return (
    <MainLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pengaturan</h1>
            <p className="text-muted-foreground">Kelola konfigurasi sistem dan preferensi</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Umum
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Pengguna
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Keamanan
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifikasi
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Sistem
            </TabsTrigger>
            <TabsTrigger value="locale" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Lokalisasi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Aplikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Nama Aplikasi</Label>
                    <Input id="app-name" defaultValue="CPMI Training Management" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-version">Versi</Label>
                    <Input id="app-version" defaultValue="1.0.0" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="app-description">Deskripsi</Label>
                    <Textarea 
                      id="app-description" 
                      defaultValue="Sistem manajemen pelatihan untuk Calon Pekerja Migran Indonesia"
                      rows={3}
                    />
                  </div>
                  <Button>Simpan Perubahan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Umum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mode Maintenance</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan untuk pemeliharaan sistem</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Registrasi Terbuka</Label>
                      <p className="text-sm text-muted-foreground">Izinkan registrasi pengguna baru</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Tampilkan informasi debug</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manajemen Pengguna</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-users">Maksimal Pengguna</Label>
                    <Input id="max-users" type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (menit)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Logout Inactive Users</Label>
                      <p className="text-sm text-muted-foreground">Logout otomatis pengguna tidak aktif</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button>Simpan Pengaturan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Role & Permission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Super Admin</h4>
                          <p className="text-sm text-muted-foreground">Akses penuh sistem</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Admin</h4>
                          <p className="text-sm text-muted-foreground">Manajemen CPMI dan kelas</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Pengajar</h4>
                          <p className="text-sm text-muted-foreground">Akses pembelajaran</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">CPMI</h4>
                          <p className="text-sm text-muted-foreground">Akses terbatas</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kebijakan Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-password">Panjang Minimum</Label>
                    <Input id="min-password" type="number" defaultValue="8" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Wajib Huruf Besar</Label>
                      <p className="text-sm text-muted-foreground">Minimal 1 huruf kapital</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Wajib Angka</Label>
                      <p className="text-sm text-muted-foreground">Minimal 1 angka</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Wajib Karakter Khusus</Label>
                      <p className="text-sm text-muted-foreground">Minimal 1 simbol</p>
                    </div>
                    <Switch />
                  </div>
                  <Button>Simpan Kebijakan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Keamanan Sistem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input id="max-attempts" type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Lockout Duration (menit)</Label>
                    <Input id="lockout-duration" type="number" defaultValue="15" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Wajibkan 2FA untuk admin</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-muted-foreground">Batasi akses berdasarkan IP</p>
                    </div>
                    <Switch />
                  </div>
                  <Button>Simpan Pengaturan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Absensi Harian</Label>
                          <p className="text-sm text-muted-foreground">Kirim laporan absensi</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Reminder Tugas</Label>
                          <p className="text-sm text-muted-foreground">Pengingat tugas CPMI</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Update Sistem</Label>
                          <p className="text-sm text-muted-foreground">Pemberitahuan update</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Pesan Baru</Label>
                          <p className="text-sm text-muted-foreground">Notifikasi pesan masuk</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Jadwal Berubah</Label>
                          <p className="text-sm text-muted-foreground">Perubahan jadwal</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Pengumuman</Label>
                          <p className="text-sm text-muted-foreground">Pengumuman penting</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button>Simpan Pengaturan Notifikasi</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database & Storage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Database Status</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Connected</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Usage</Label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Used: 2.3 GB</span>
                        <span>Total: 10 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Backup Database</Button>
                    <Button variant="outline" className="w-full">Clear Cache</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-schedule">Auto Backup</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Daily at 2:00 AM</option>
                      <option>Weekly on Sunday</option>
                      <option>Monthly</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Update</Label>
                      <p className="text-sm text-muted-foreground">Update otomatis minor version</p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="w-full">Schedule Maintenance</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locale">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bahasa & Regional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Bahasa Default</Label>
                    <select id="language" className="w-full p-2 border rounded-md">
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select id="timezone" className="w-full p-2 border rounded-md">
                      <option value="Asia/Jakarta">WIB (GMT+7)</option>
                      <option value="Asia/Makassar">WITA (GMT+8)</option>
                      <option value="Asia/Jayapura">WIT (GMT+9)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Format Tanggal</Label>
                    <select id="date-format" className="w-full p-2 border rounded-md">
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <Button>Simpan Pengaturan</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mata Uang & Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Mata Uang</Label>
                    <select id="currency" className="w-full p-2 border rounded-md">
                      <option value="IDR">Rupiah (IDR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="SAR">Saudi Riyal (SAR)</option>
                      <option value="MYR">Malaysian Ringgit (MYR)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number-format">Format Angka</Label>
                    <select id="number-format" className="w-full p-2 border rounded-md">
                      <option value="1,234.56">1,234.56</option>
                      <option value="1.234,56">1.234,56</option>
                      <option value="1 234,56">1 234,56</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Currency Symbol</Label>
                      <p className="text-sm text-muted-foreground">Tampilkan simbol mata uang</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button>Simpan Format</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}