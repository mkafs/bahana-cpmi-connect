-- Create sample users for each role (you'll need to create the actual auth users manually)
-- First, let's insert sample profiles for different roles

-- Insert sample profiles (you'll need to replace these IDs with actual user IDs from auth)
INSERT INTO public.profiles (id, name, email, role, phone) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Super Admin', 'superadmin@gmail.com', 'superadmin', '+62812345678901'),
  ('00000000-0000-0000-0000-000000000002', 'Admin User', 'admin@gmail.com', 'admin', '+62812345678902'),
  ('00000000-0000-0000-0000-000000000003', 'Guru Sarah', 'pengajar@gmail.com', 'pengajar', '+62812345678903'),
  ('00000000-0000-0000-0000-000000000004', 'Ahmad Fauzi', 'cpmi1@gmail.com', 'cpmi', '+62812345678904'),
  ('00000000-0000-0000-0000-000000000005', 'Siti Nurhaliza', 'cpmi2@gmail.com', 'cpmi', '+62812345678905'),
  ('00000000-0000-0000-0000-000000000006', 'Budi Santoso', 'cpmi3@gmail.com', 'cpmi', '+62812345678906')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone;

-- Create sample subjects
INSERT INTO public.subjects (code, name, description) VALUES
  ('ENG101', 'Bahasa Inggris Dasar', 'Pembelajaran bahasa Inggris untuk pemula'),
  ('COMP101', 'Komputer Dasar', 'Pengenalan penggunaan komputer dan aplikasi'),
  ('CULT101', 'Budaya Kerja', 'Pemahaman budaya kerja di luar negeri'),
  ('ARAB101', 'Bahasa Arab', 'Pembelajaran bahasa Arab dasar'),
  ('SKILL101', 'Keterampilan Khusus', 'Pelatihan keterampilan sesuai bidang')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- Create sample classes
INSERT INTO public.classes (name, description, capacity) VALUES
  ('Kelas A - Batch 2024.1', 'Kelas untuk calon CPMI batch pertama 2024', 30),
  ('Kelas B - Batch 2024.1', 'Kelas untuk calon CPMI batch pertama 2024', 30),
  ('Kelas C - Batch 2024.2', 'Kelas untuk calon CPMI batch kedua 2024', 25)
ON CONFLICT DO NOTHING;

-- Get class IDs for further inserts
DO $$
DECLARE
    class_a_id UUID;
    class_b_id UUID;
    class_c_id UUID;
    subject_eng_id UUID;
    subject_comp_id UUID;
    subject_cult_id UUID;
    pengajar_id UUID := '00000000-0000-0000-0000-000000000003';
BEGIN
    -- Get class IDs
    SELECT id INTO class_a_id FROM public.classes WHERE name = 'Kelas A - Batch 2024.1';
    SELECT id INTO class_b_id FROM public.classes WHERE name = 'Kelas B - Batch 2024.1';
    SELECT id INTO class_c_id FROM public.classes WHERE name = 'Kelas C - Batch 2024.2';
    
    -- Get subject IDs
    SELECT id INTO subject_eng_id FROM public.subjects WHERE code = 'ENG101';
    SELECT id INTO subject_comp_id FROM public.subjects WHERE code = 'COMP101';
    SELECT id INTO subject_cult_id FROM public.subjects WHERE code = 'CULT101';

    -- Insert sample CPMI data
    INSERT INTO public.cpmi (user_id, no_peserta, status, tanggal_masuk, class_id, alamat) VALUES
      ('00000000-0000-0000-0000-000000000004', 'CPMI2024001', 'aktif', '2024-01-15', class_a_id, 'Jl. Merdeka No. 123, Jakarta'),
      ('00000000-0000-0000-0000-000000000005', 'CPMI2024002', 'piket', '2024-01-15', class_a_id, 'Jl. Sudirman No. 456, Bandung'),
      ('00000000-0000-0000-0000-000000000006', 'CPMI2024003', 'sudah_terbang', '2024-01-15', class_b_id, 'Jl. Gatot Subroto No. 789, Surabaya')
    ON CONFLICT (user_id) DO UPDATE SET
      no_peserta = EXCLUDED.no_peserta,
      status = EXCLUDED.status,
      tanggal_masuk = EXCLUDED.tanggal_masuk,
      class_id = EXCLUDED.class_id,
      alamat = EXCLUDED.alamat;

    -- Insert class subjects (schedule)
    INSERT INTO public.class_subjects (class_id, subject_id, pengajar_id, schedule_day, schedule_time) VALUES
      (class_a_id, subject_eng_id, pengajar_id, 1, '08:00:00'), -- Monday
      (class_a_id, subject_comp_id, pengajar_id, 2, '10:00:00'), -- Tuesday
      (class_a_id, subject_cult_id, pengajar_id, 3, '13:00:00'), -- Wednesday
      (class_b_id, subject_eng_id, pengajar_id, 1, '10:00:00'),
      (class_b_id, subject_comp_id, pengajar_id, 2, '13:00:00'),
      (class_c_id, subject_eng_id, pengajar_id, 4, '08:00:00') -- Thursday
    ON CONFLICT DO NOTHING;

    -- Insert sample piket schedules
    INSERT INTO public.piket_schedules (cpmi_id, date, shift, notes) 
    SELECT 
      cpmi.id,
      CURRENT_DATE,
      'Pagi',
      'Membersihkan ruang kelas dan kantor'
    FROM public.cpmi 
    WHERE status = 'piket'
    ON CONFLICT DO NOTHING;

    -- Insert sample notifications
    INSERT INTO public.notifications (user_id, title, message, type) VALUES
      ('00000000-0000-0000-0000-000000000004', 'Selamat Datang!', 'Selamat datang di sistem CPMI. Jangan lupa melakukan absensi setiap hari.', 'info'),
      ('00000000-0000-0000-0000-000000000005', 'Tugas Piket Hari Ini', 'Anda dijadwalkan piket hari ini. Silakan cek jadwal piket Anda.', 'warning'),
      ('00000000-0000-0000-0000-000000000002', 'Laporan Bulanan', 'Saatnya membuat laporan bulanan aktivitas CPMI.', 'info')
    ON CONFLICT DO NOTHING;

    -- Insert sample messages
    INSERT INTO public.messages (sender_id, recipient_id, title, content) VALUES
      ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'Pemberitahuan Jadwal', 'Jadwal pelajaran minggu depan telah dipublikasikan. Silakan cek di menu Jadwal & Pelajaran.'),
      ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', 'Tugas Tambahan', 'Mohon siapkan presentasi untuk pelajaran budaya kerja minggu depan.')
    ON CONFLICT DO NOTHING;

END $$;

-- Create function to setup demo users (call this after creating auth users)
CREATE OR REPLACE FUNCTION setup_demo_users()
RETURNS TEXT AS $$
BEGIN
  RETURN 'Demo users setup completed. Please create the actual auth users with the following emails:
  - superadmin@gmail.com (role: superadmin)
  - admin@gmail.com (role: admin) 
  - pengajar@gmail.com (role: pengajar)
  - cpmi1@gmail.com (role: cpmi)
  - cpmi2@gmail.com (role: cpmi)
  - cpmi3@gmail.com (role: cpmi)
  
  Password untuk semua: password123';
END;
$$ LANGUAGE plpgsql;