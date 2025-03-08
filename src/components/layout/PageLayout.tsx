
// src/components/layout/PageLayout.tsx

import { ReactNode, useMemo, useEffect } from "react";
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
  schema?: Record<string, any>;
}

const PageLayout = ({ 
  children, 
  title = "Fence Contractors Directory", 
  description = "Find the best fence contractors in your area", 
  canonicalUrl,
  ogImage,
  schema
}: PageLayoutProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Log the current page for debugging
  useEffect(() => {
    console.log(`Page loaded: ${location.pathname}`);
  }, [location.pathname]);
  
  // Generate website schema if none is provided
  const generatedSchema = useMemo(() => {
    if (schema) return schema;
    
    // Default website schema with breadcrumbs for better SEO
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        }
      ]
    };
    
    // Add current page to breadcrumbs if not home
    if (location.pathname !== '/') {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      let currentPath = '';
      
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          "item": `${window.location.origin}${currentPath}`
        });
      });
    }
    
    // Website schema with additional organization info for better search presentation
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": title,
      "description": description,
      "url": canonicalUrl || window.location.origin + location.pathname,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Fence Finder Hub",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/favicon.ico`
        }
      },
      "breadcrumb": breadcrumbList
    };
  }, [schema, title, description, canonicalUrl, location.pathname]);
  
  // Generate canonical URL if not provided
  const finalCanonicalUrl = canonicalUrl || `${window.location.origin}${location.pathname}`;
  
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags 
        title={title}
        description={description}
        canonicalUrl={finalCanonicalUrl}
        ogImage={ogImage}
        schema={generatedSchema}
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
