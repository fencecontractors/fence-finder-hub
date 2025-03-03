
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const MetaTags = ({
  title = "Fence Contractors Directory",
  description = "Find the best fence contractors in your area",
  canonicalUrl,
  ogImage = "/og-image.png"
}: MetaTagsProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
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
      
      {/* Sitemap reference */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default MetaTags;
