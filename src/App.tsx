import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Auth } from "./pages/Auth";
import { Absensi } from "./pages/Absensi";
import { LaporanPiket } from "./pages/LaporanPiket";
import { JadwalPelajaran } from "./pages/JadwalPelajaran";
import { Pesan } from "./pages/Pesan";
import { Notifikasi } from "./pages/Notifikasi";
import { ManajemenCPMI } from "./pages/ManajemenCPMI";
import { ManajemenKelas } from "./pages/ManajemenKelas";
import { Laporan } from "./pages/Laporan";
import { Pengaturan } from "./pages/Pengaturan";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/absensi" element={
              <ProtectedRoute>
                <Absensi />
              </ProtectedRoute>
            } />
            <Route path="/piket" element={
              <ProtectedRoute>
                <LaporanPiket />
              </ProtectedRoute>
            } />
            <Route path="/pelajaran" element={
              <ProtectedRoute>
                <JadwalPelajaran />
              </ProtectedRoute>
            } />
            <Route path="/pesan" element={
              <ProtectedRoute>
                <Pesan />
              </ProtectedRoute>
            } />
            <Route path="/notifikasi" element={
              <ProtectedRoute>
                <Notifikasi />
              </ProtectedRoute>
            } />
            <Route path="/cpmi" element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                <ManajemenCPMI />
              </ProtectedRoute>
            } />
            <Route path="/kelas" element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                <ManajemenKelas />
              </ProtectedRoute>
            } />
            <Route path="/laporan" element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin', 'pengajar']}>
                <Laporan />
              </ProtectedRoute>
            } />
            <Route path="/pengaturan" element={
              <ProtectedRoute>
                <Pengaturan />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
