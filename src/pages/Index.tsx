import { Dashboard } from "./Dashboard";

const Index = () => {
  // In a real app, you would get this from your auth context/state
  const userRole = "cpmi"; // Change this to test different roles: "superadmin", "admin", "pengajar", "cpmi"
  const userName = "Ahmad Fauzi";

  return <Dashboard userRole={userRole as any} userName={userName} />;
};

export default Index;
