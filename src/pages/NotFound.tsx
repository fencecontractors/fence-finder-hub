
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Add a meta tag to tell search engines this is a 404 page
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex';
    document.head.appendChild(metaRobots);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [location.pathname]);

  return (
    <PageLayout 
      title="404 - Page Not Found | Fence Finder Hub"
      description="The page you are looking for does not exist or has been moved."
    >
      <div className="min-h-[60vh] flex items-center justify-center bg-muted/20 py-16">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the page you're looking for. It might have been removed,
            renamed, or didn't exist in the first place.
          </p>
          <Button asChild size="lg">
            <a href="/" className="inline-flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
