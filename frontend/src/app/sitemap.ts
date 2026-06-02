import { MetadataRoute } from 'next';
import {
  NICHES,
  CITIES,
  getAllVerifiedInfluencers,
  getAllPublishedPostSlugs,
} from '../lib/queries';

export const revalidate = 3600; // Regenerate sitemap every hour

const BASE_URL = 'https://www.earlybirdindia.online';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── STATIC PAGES ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                             lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/influencers`,            lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE_URL}/blog`,                   lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // ── NICHE CATEGORY PAGES (20) ────────────────────────────────────────────
  const nichePages: MetadataRoute.Sitemap = NICHES.map((niche) => ({
    url: `${BASE_URL}/influencers/category/${niche}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }));

  // ── CITY PAGES (24) ──────────────────────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/influencers/city/${city}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // ── NICHE × CITY COMBO PAGES (480) ──────────────────────────────────────
  const comboPages: MetadataRoute.Sitemap = CITIES.flatMap((city) =>
    NICHES.map((niche) => ({
      url: `${BASE_URL}/influencers/city/${city}/category/${niche}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }))
  );

  // ── INDIVIDUAL INFLUENCER PROFILE PAGES (from DB) ───────────────────────
  const influencers = await getAllVerifiedInfluencers();
  const influencerPages: MetadataRoute.Sitemap = influencers.map((inf) => ({
    url: `${BASE_URL}/influencers/${inf.username}`,
    lastModified: inf.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // ── BLOG POSTS (from DB) ─────────────────────────────────────────────────
  const posts = await getAllPublishedPostSlugs();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...nichePages,
    ...cityPages,
    ...comboPages,
    ...influencerPages,
    ...blogPages,
  ];
}
