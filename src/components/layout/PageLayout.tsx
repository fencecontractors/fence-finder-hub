
import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MetaTags from "./MetaTags";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any>[];
  noindex?: boolean;
}

const PageLayout = ({ 
  children, 
  title = "Fence Contractors Directory", 
  description = "Find the best fence contractors in your area", 
  canonicalUrl,
  ogImage,
  schema = [],
  noindex = false
}: PageLayoutProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Generate local business schema if on contractor page
  const isContractorPage = location.pathname.includes('/contractor/');
  
  // Generate website schema if none is provided
  const generatedSchema = useMemo(() => {
    if (schema && schema.length > 0) return schema;
    
    const schemas = [];
    
    // Default breadcrumb schema for most pages
    if (!isAdminPage && location.pathname !== '/') {
      // Extract path segments for breadcrumbs
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const breadcrumbItems = pathSegments.map((segment, index) => {
        const position = index + 1;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        const item = {
          "@type": "ListItem",
          "position": position,
          "name": name,
          "item": `${window.location.origin}/${pathSegments.slice(0, index + 1).join('/')}`
        };
        return item;
      });
      
      // Add home as first item
      breadcrumbItems.unshift({
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      });
      
      // Adjust positions after adding home
      breadcrumbItems.forEach((item, index) => {
        item.position = index + 1;
      });
      
      // Create breadcrumb schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      });
    }
    
    return schemas;
  }, [schema, location.pathname, isAdminPage]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags 
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        schema={generatedSchema}
        noindex={isAdminPage || noindex}
      />
      {!isAdminPage && <Header />}
      <main className={`flex-grow ${isAdminPage ? 'pt-4' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default PageLayout;
