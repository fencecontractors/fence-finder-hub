// src/components/admin/AdminLayout.tsx

import { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminAuth";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LogOut, Shield, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useContactMessages } from "@/data"; // Import useContactMessages

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { data: messages = [] } = useContactMessages(); // Get messages

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin area",
    });
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }

  const currentPath = location.pathname;

  // Calculate unread messages count
  const unreadCount = messages.filter(message => !message.read).length;


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
            <TabsTrigger value="contact-messages" asChild className="flex-1 relative">
              <Link to="/admin/contact-messages">
                <Mail className="mr-2 h-4 w-4" />
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {unreadCount}
                  </span>
                )}
              </Link>
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

const getTabValue = (path: string): string => {
  if (path.includes("/admin/blogs")) return "blogs";
  if (path.includes("/admin/contractors")) return "contractors";
  if (path.includes("/admin/contact-messages")) return "contact-messages";
  return "dashboard";
};

export default AdminLayout;