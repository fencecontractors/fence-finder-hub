
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any>[];
  noindex?: boolean;
}

const MetaTags = ({
  title = "Fence Contractors Directory",
  description = "Find the best fence contractors in your area",
  canonicalUrl,
  ogImage = "/og-image.png",
  schema = [],
  noindex = false
}: MetaTagsProps) => {
  // Get the current URL if canonicalUrl is not provided
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Base schema that will be included on all pages
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fence Finder Hub",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : ''}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Combine base schema with any page-specific schemas
  const allSchemas = [baseSchema, ...schema];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Robots directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      
      {/* Performance & SEO best practices */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#0066FF" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to essential domains */}
      <link rel="preconnect" href="https://rsms.me" />
      <link rel="preconnect" href="https://applesocial.s3.amazonaws.com" />
      
      {/* Sitemap reference */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      
      {/* Structured data / JSON-LD Schema */}
      {allSchemas.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaTags;
