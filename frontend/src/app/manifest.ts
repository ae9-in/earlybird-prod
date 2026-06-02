import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EarlyBird India — Brand Promoter & Influencer Platform',
    short_name: 'EarlyBird India',
    description: 'Hire 50,000+ verified brand promoters and influencers across India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#0f0f0f',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
