import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.suneettipirneni.stream',
      lastModified: new Date(),
    },
    {
      url: 'https://www.suneettipirneni.stream/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://www.suneettipirneni.stream/blog',
      lastModified: new Date(),
    },
  ]
}