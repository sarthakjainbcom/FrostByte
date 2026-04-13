import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/fighters', '/stages', '/modes', '/mechanics', '/roadmap', '/media', '/community', '/runtime', '/playtest', '/legal'];
  return routes.map((route) => ({ url: `https://grandlinerumble.example.com${route}`, lastModified: new Date() }));
}
