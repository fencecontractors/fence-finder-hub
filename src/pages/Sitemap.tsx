
import { useEffect, useState } from "react";
import { generateSitemap } from "../utils/sitemap";

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>("");
  
  useEffect(() => {
    // In a real production environment, you'd use the actual domain
    const baseUrl = window.location.origin;
    const xml = generateSitemap(baseUrl);
    setSitemapXml(xml);
    
    // Set XML content type
    document.querySelector('meta[http-equiv="Content-Type"]')?.remove();
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'text/xml; charset=utf-8';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);
  
  return (
    <pre style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
      {sitemapXml}
    </pre>
  );
};

export default Sitemap;
