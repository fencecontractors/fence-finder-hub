
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authenticateAdmin, isAdminAuthenticated } from "@/utils/adminAuth";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const navigate = useNavigate();

  // If already authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay for a more realistic login experience
    setTimeout(() => {
      const isValid = authenticateAdmin(password);
      
      if (isValid) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin area"
        });
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        toast({
          title: "Authentication failed",
          description: "The password you entered is incorrect",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <PageLayout title="Admin Login" description="Log in to the admin area">
      <div className="page-container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Admin Login</CardTitle>
            </div>
            <CardDescription>
              Enter your admin password to access the management area
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminLogin;
