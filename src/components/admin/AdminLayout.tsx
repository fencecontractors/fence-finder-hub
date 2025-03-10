
import { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminAuth";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { LogOut, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);
  
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin area"
    });
  };
  
  if (isAuthenticated === null) {
    // Still loading
    return <div>Loading...</div>;
  }
  
  if (isAuthenticated === false) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  
  const currentPath = location.pathname;
  
  return (
    <PageLayout>
      <div className="page-container max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Admin Management</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <Tabs value={getTabValue(currentPath)} className="mb-8">
          <TabsList className="w-full">
            <TabsTrigger value="dashboard" asChild className="flex-1">
              <Link to="/admin">Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger value="blogs" asChild className="flex-1">
              <Link to="/admin/blogs">Blog Posts</Link>
            </TabsTrigger>
            <TabsTrigger value="contractors" asChild className="flex-1">
              <Link to="/admin/contractors">Contractors</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div>
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
};

// Helper function to determine the active tab based on path
const getTabValue = (path: string): string => {
  if (path.includes("/admin/blogs")) return "blogs";
  if (path.includes("/admin/contractors")) return "contractors";
  return "dashboard";
};

export default AdminLayout;
