import { Dashboard } from "./Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CPMIData {
  id: string;
  status: 'aktif' | 'piket' | 'sudah_terbang';
  class_id?: string;
  no_peserta?: string;
  tanggal_masuk?: string;
  tanggal_terbang?: string;
  alamat?: string;
  user_id: string;
}

const Index = () => {
  const { profile } = useAuth();
  const [cpmiData, setCpmiData] = useState<CPMIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCPMIData = async () => {
      if (profile?.role === 'cpmi' && profile?.id) {
        try {
          const { data, error } = await supabase
            .from('cpmi')
            .select('*')
            .eq('user_id', profile.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching CPMI data:', error);
          } else {
            setCpmiData(data);
          }
        } catch (error) {
          console.error('Error fetching CPMI data:', error);
        }
      }
      setLoading(false);
    };

    if (profile) {
      fetchCPMIData();
    }
  }, [profile]);

  if (!profile) {
    return null; // This should not happen due to ProtectedRoute
  }

  if (loading && profile.role === 'cpmi') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Dashboard 
      userRole={profile.role} 
      userName={profile.name} 
      cpmiData={cpmiData}
    />
  );
};

export default Index;
