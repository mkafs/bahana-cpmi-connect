import { Dashboard } from "./Dashboard";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { profile } = useAuth();

  if (!profile) {
    return null; // This should not happen due to ProtectedRoute
  }

  return <Dashboard userRole={profile.role} userName={profile.name} />;
};

export default Index;
