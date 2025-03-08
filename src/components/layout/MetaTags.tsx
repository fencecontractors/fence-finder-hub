// src/components/layout/MetaTags.tsx


import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

const MetaTags = ({
  title = "Fence Contractors Directory",
  description = "Find the best fence contractors in your area",
  canonicalUrl,
  ogImage = "/og-image.png",
  schema
}: MetaTagsProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
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
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default MetaTags;
