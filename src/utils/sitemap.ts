
import { Contractor, BlogPost } from "../types";
import { fenceContractors, blogPosts } from "../data";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string): string => {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];
  
  // Add static pages
  urls.push({
    loc: `${baseUrl}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 1.0
  });
  
  urls.push({
    loc: `${baseUrl}/contractors`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.9
  });
  
  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.8
  });
  
  // Add state pages
  const contractors = fenceContractors as Contractor[];
  const states = [...new Set(contractors.map(c => c.state))];
  
  states.forEach(state => {
    urls.push({
      loc: `${baseUrl}/contractors/${state.toLowerCase().replace(/\s+/g, '-')}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    });
    
    // Add city pages
    const citiesInState = [...new Set(
      contractors
        .filter(c => c.state === state)
        .map(c => c.city)
    )];
    
    citiesInState.forEach(city => {
      urls.push({
        loc: `${baseUrl}/contractors/${state.toLowerCase().replace(/\s+/g, '-')}/${city.toLowerCase().replace(/\s+/g, '-')}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.6
      });
    });
  });
  
  // Add contractor detail pages
  contractors.forEach(contractor => {
    urls.push({
      loc: `${baseUrl}/contractors/${contractor.state.toLowerCase().replace(/\s+/g, '-')}/${contractor.city.toLowerCase().replace(/\s+/g, '-')}/${contractor.unique_id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
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
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority !== undefined) xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};
