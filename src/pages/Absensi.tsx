import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClassSubject {
  id: string;
  subject: {
    name: string;
    code: string;
  };
  pengajar: {
    name: string;
  };
  schedule_day: number;
  schedule_time: string;
  class: {
    name: string;
  };
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: string;
  notes?: string;
  class_subject: {
    id: string;
    schedule_time: string;
    subject: { name: string; code: string };
    pengajar: { name: string };
    class: { name: string };
  };
}

export function Absensi() {
  const { profile } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todaySchedule, setTodaySchedule] = useState<ClassSubject[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (profile?.role === 'cpmi') {
      fetchTodaySchedule();
      fetchAttendanceRecords();
    }
  }, [profile, selectedDate]);

  const fetchTodaySchedule = async () => {
    try {
      const dayOfWeek = selectedDate.getDay() || 7; // Convert Sunday (0) to 7
      
      // First get CPMI data to find class_id
      const { data: cpmiData } = await supabase
        .from('cpmi')
        .select('class_id')
        .eq('user_id', profile?.id)
        .single();

      if (!cpmiData?.class_id) return;

      const { data, error } = await supabase
        .from('class_subjects')
        .select(`
          id,
          schedule_day,
          schedule_time,
          subject:subjects(name, code),
          pengajar:profiles!class_subjects_pengajar_id_fkey(name),
          class:classes(name)
        `)
        .eq('class_id', cpmiData.class_id)
        .eq('schedule_day', dayOfWeek)
        .order('schedule_time');

      if (error) throw error;
      setTodaySchedule(data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      // Get CPMI ID first
      const { data: cpmiData } = await supabase
        .from('cpmi')
        .select('id')
        .eq('user_id', profile?.id)
        .single();

      if (!cpmiData?.id) return;

      const { data, error } = await supabase
        .from('attendance')
        .select(`
          id,
          date,
          status,
          notes,
          class_subject:class_subjects(
            id,
            schedule_time,
            subject:subjects(name, code),
            pengajar:profiles!class_subjects_pengajar_id_fkey(name),
            class:classes(name)
          )
        `)
        .eq('cpmi_id', cpmiData.id)
        .eq('date', selectedDate.toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleAttendance = async (classSubjectId: string) => {
    if (!selectedStatus) {
      toast({
        title: "Error",
        description: "Pilih status kehadiran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Get CPMI ID
      const { data: cpmiData } = await supabase
        .from('cpmi')
        .select('id')
        .eq('user_id', profile?.id)
        .single();

      if (!cpmiData?.id) throw new Error('CPMI data not found');

      const { error } = await supabase
        .from('attendance')
        .upsert({
          cpmi_id: cpmiData.id,
          class_subject_id: classSubjectId,
          date: selectedDate.toISOString().split('T')[0],
          status: selectedStatus as "hadir" | "tidak_hadir" | "terlambat" | "izin" | "sakit",
          notes: notes || null
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Absensi berhasil dicatat",
      });

      // Refresh data
      fetchAttendanceRecords();
      setSelectedStatus("");
      setNotes("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hadir':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'tidak_hadir':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'terlambat':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'izin':
        return <AlertCircle className="h-4 w-4 text-info" />;
      case 'sakit':
        return <AlertCircle className="h-4 w-4 text-secondary" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      hadir: 'success',
      tidak_hadir: 'destructive',
      terlambat: 'warning',
      izin: 'default',
      sakit: 'secondary'
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status.replace('_', ' ').toUpperCase()}</Badge>;
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <MainLayout userRole={profile?.role} userName={profile?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Absensi</h1>
          <p className="text-muted-foreground">Kelola kehadiran Anda dalam pembelajaran</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Tanggal</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Schedule & Attendance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Jadwal {isToday ? 'Hari Ini' : selectedDate.toLocaleDateString('id-ID')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaySchedule.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Tidak ada jadwal untuk tanggal ini
                  </p>
                ) : (
                  <div className="space-y-4">
                    {todaySchedule.map((schedule) => {
                      const attendanceRecord = attendanceRecords.find(
                        record => record.class_subject.id === schedule.id
                      );
                      const isPastTime = isToday && currentTime > schedule.schedule_time;
                      const canAttend = isToday && !attendanceRecord;

                      return (
                        <div key={schedule.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{schedule.subject.name}</h3>
                                <Badge variant="outline">{schedule.subject.code}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Pengajar: {schedule.pengajar.name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{schedule.schedule_time}</span>
                                <MapPin className="h-4 w-4 ml-2" />
                                <span>{schedule.class.name}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              {attendanceRecord ? (
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(attendanceRecord.status)}
                                  {getStatusBadge(attendanceRecord.status)}
                                </div>
                              ) : canAttend ? (
                                <div className="space-y-2">
                                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-40">
                                      <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="hadir">Hadir</SelectItem>
                                      <SelectItem value="terlambat">Terlambat</SelectItem>
                                      <SelectItem value="izin">Izin</SelectItem>
                                      <SelectItem value="sakit">Sakit</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {selectedStatus && (
                                    <div className="space-y-2">
                                      <Textarea
                                        placeholder="Catatan (opsional)"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-40 h-20"
                                      />
                                      <Button
                                        onClick={() => handleAttendance(schedule.id)}
                                        disabled={loading}
                                        size="sm"
                                        className="w-40"
                                      >
                                        Catat Absensi
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ) : isPastTime ? (
                                <Badge variant="secondary">Terlewat</Badge>
                              ) : (
                                <Badge variant="outline">Belum Dimulai</Badge>
                              )}
                            </div>
                          </div>
                          
                          {attendanceRecord?.notes && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-sm text-muted-foreground">
                                <strong>Catatan:</strong> {attendanceRecord.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}