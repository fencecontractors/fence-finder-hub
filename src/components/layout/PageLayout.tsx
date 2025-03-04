
import { ReactNode, useMemo } from "react";
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
  // Generate website schema if none is provided
  const generatedSchema = useMemo(() => {
    if (schema) return schema;
    
    // Default website schema
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": title,
      "description": description,
      "url": canonicalUrl || window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  }, [schema, title, description, canonicalUrl]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags 
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        schema={generatedSchema}
      />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
