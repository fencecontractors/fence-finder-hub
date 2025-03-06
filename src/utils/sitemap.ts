
import { Contractor, BlogPost } from "../types";
import { fenceContractors, blogPosts } from "../data";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generates an XML sitemap for the website
 * @param baseUrl - The base URL of the website
 * @returns XML string representing the sitemap
 */
export const generateSitemap = (baseUrl: string): string => {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];
  
  // Add static pages
  const staticPages = [
    { path: "/", priority: 1.0, changefreq: 'weekly' as const },
    { path: "/contractors", priority: 0.9, changefreq: 'weekly' as const },
    { path: "/blog", priority: 0.8, changefreq: 'weekly' as const },
    { path: "/search", priority: 0.7, changefreq: 'weekly' as const },
  ];
  
  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  // Cache data to avoid repeated calculations
  const contractors = fenceContractors as Contractor[];
  
  // Create efficient maps for lookups
  const stateMap = new Map<string, Set<string>>();
  
  // Process contractors once
  contractors.forEach(c => {
    // Add state if not exists
    if (!stateMap.has(c.state)) {
      stateMap.set(c.state, new Set<string>());
    }
    // Add city to state
    stateMap.get(c.state)?.add(c.city);
    
    // Add contractor detail page
    const stateUrl = c.state.toLowerCase().replace(/\s+/g, '-');
    const cityUrl = c.city.toLowerCase().replace(/\s+/g, '-');
    
    urls.push({
      loc: `${baseUrl}/contractors/${stateUrl}/${cityUrl}/${c.unique_id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    });
  });
  
  // Add state pages
  stateMap.forEach((cities, state) => {
    const stateUrl = state.toLowerCase().replace(/\s+/g, '-');
    
    urls.push({
      loc: `${baseUrl}/contractors/${stateUrl}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    });
    
    // Add city pages
    cities.forEach(city => {
      const cityUrl = city.toLowerCase().replace(/\s+/g, '-');
      
      urls.push({
        loc: `${baseUrl}/contractors/${stateUrl}/${cityUrl}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.6
      });
    });
  });
  
  // Add blog post pages
  const posts = blogPosts as BlogPost[];
  posts.forEach(post => {
    urls.push({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.date || today,
      changefreq: 'monthly',
      priority: 0.5
    });
  });
  
  // Generate XML - use template literals for better performance
  const urlXmlItems = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `    <priority>${url.priority.toFixed(1)}</priority>` : ''}
  </url>`).join('\n');
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlXmlItems}
</urlset>`;
  
  return xml;
};
