import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin-earlybird/',
          '/login',
          '/settings/',
          '/onboarding/',
          '/_next/',
          '/auth/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/og/', '/favicon.png'],
      },
    ],
    sitemap: 'https://www.earlybirdindia.online/sitemap.xml',
    host: 'https://www.earlybirdindia.online',
  };
}
