import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Import all original stylesheets globally
import '../index.css';
import '../App.css';
import '../components/Header.css';
import '../components/Hero.css';
import '../components/HowItWorks.css';
import '../components/FeaturedOffers.css';
import '../components/WhyItWorks.css';
import '../components/PartnerWithUs.css';
import '../components/CTASection.css';
import '../components/Footer.css';
import '../components/HomepageFAQ.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  // ── CORE ──────────────────────────────────────────────────────────────
  metadataBase: new URL('https://www.earlybirdindia.online'),
  
  title: {
    default: 'EarlyBird India — #1 Brand Promoter & Influencer Marketing Platform',
    template: '%s | EarlyBird India',
  },
  
  description:
    'Connect with 50,000+ verified brand promoters and influencers across India. ' +
    'Run influencer campaigns on Instagram, YouTube & Reels. Free for brands. ' +
    'Join EarlyBird India — the fastest-growing influencer marketplace in India.',

  // ── KEYWORDS ──────────────────
  keywords: [
    'brand promoter india',
    'influencer marketing platform india',
    'hire influencers india',
    'micro influencer india',
    'influencer marketplace india',
    'instagram influencer india',
    'brand ambassador india',
    'earlybird india',
    'influencer agency india',
    'product promotion india',
  ],

  // ── OPEN GRAPH ─────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.earlybirdindia.online',
    siteName: 'EarlyBird India',
    title: 'EarlyBird India — #1 Brand Promoter & Influencer Marketing Platform',
    description:
      'Connect with 50,000+ verified brand promoters across India. ' +
      'Launch influencer campaigns on Instagram, YouTube & Reels in minutes.',
    images: [
      {
        url: '/og/default.jpg', // 1200×630px, < 300KB
        width: 1200,
        height: 630,
        alt: 'EarlyBird India — Brand Promoter & Influencer Marketing Platform',
        type: 'image/jpeg',
      },
    ],
  },

  // ── TWITTER / X CARD ───────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@earlybirdindia',
    creator: '@earlybirdindia',
    title: 'EarlyBird India — Brand Promoter & Influencer Marketing Platform',
    description: 'Connect with 50,000+ verified brand promoters across India.',
    images: ['/og/default.jpg'],
  },

  // ── ROBOTS ─────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── CANONICAL ──────────────────────────────────────────────────────────
  alternates: {
    canonical: 'https://www.earlybirdindia.online',
    languages: {
      'en-IN': 'https://www.earlybirdindia.online',
      'hi-IN': 'https://www.earlybirdindia.online/hi',
      'ta-IN': 'https://www.earlybirdindia.online/ta',
      'te-IN': 'https://www.earlybirdindia.online/te',
      'kn-IN': 'https://www.earlybirdindia.online/kn',
      'mr-IN': 'https://www.earlybirdindia.online/mr',
      'bn-IN': 'https://www.earlybirdindia.online/bn',
    },
  },

  // ── VERIFICATION ───────────────────────────────────────────────────────
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
    other: {
      'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
    },
  },

  // ── APP / PWA ──────────────────────────────────────────────────────────
  applicationName: 'EarlyBird India',
  authors: [{ name: 'EarlyBird India', url: 'https://www.earlybirdindia.online' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'Business, Marketing, Influencer Platform',
  classification: 'Marketing Technology',
  creator: 'EarlyBird India',
  publisher: 'EarlyBird India',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${inter.variable}`}>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
