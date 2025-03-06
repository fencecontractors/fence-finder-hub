
import { useEffect, useState } from "react";
import { generateSitemap } from "../utils/sitemap";
import { Helmet } from "react-helmet-async";

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>("");
  
  useEffect(() => {
    // Generate sitemap only once on component mount
    const baseUrl = window.location.origin;
    const xml = generateSitemap(baseUrl);
    setSitemapXml(xml);
    
    // Set the content-type header for XML
    const metaElement = document.createElement('meta');
    metaElement.httpEquiv = 'Content-Type';
    metaElement.content = 'text/xml; charset=utf-8';
    document.head.appendChild(metaElement);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Sitemap | Fence Contractors Directory</title>
        <meta name="robots" content="noindex, follow" />
        <meta httpEquiv="Content-Type" content="text/xml; charset=utf-8" />
      </Helmet>
      <pre style={{ 
        display: 'block', 
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        padding: '1rem' 
      }}>
        {sitemapXml}
      </pre>
    </>
  );
};

export default Sitemap;
