import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Absensi } from "./pages/Absensi";
import { LaporanPiket } from "./pages/LaporanPiket";
import { JadwalPelajaran } from "./pages/JadwalPelajaran";
import { Pesan } from "./pages/Pesan";
import { Notifikasi } from "./pages/Notifikasi";
import { ManajemenCPMI } from "./pages/ManajemenCPMI";
import { ManajemenKelas } from "./pages/ManajemenKelas";
import { Laporan } from "./pages/Laporan";
import { Pengaturan } from "./pages/Pengaturan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/absensi" element={<Absensi />} />
          <Route path="/piket" element={<LaporanPiket />} />
          <Route path="/pelajaran" element={<JadwalPelajaran />} />
          <Route path="/pesan" element={<Pesan />} />
          <Route path="/notifikasi" element={<Notifikasi />} />
          <Route path="/cpmi" element={<ManajemenCPMI />} />
          <Route path="/kelas" element={<ManajemenKelas />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
