/**
 * Typed query helpers for programmatic SEO pages.
 * Wraps the raw Neon pool (db.query) with typed return values.
 * All queries are lightweight — SELECT COUNT or small projections only.
 */
import db from './db';

/** Verified influencer niches available on the platform */
export const NICHES = [
  'fashion', 'beauty', 'food', 'fitness', 'technology', 'travel',
  'lifestyle', 'gaming', 'education', 'finance', 'health', 'parenting',
  'sports', 'comedy', 'music', 'art', 'photography', 'business',
  'automotive', 'real-estate',
] as const;

/** Major Indian cities covered on the platform */
export const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata',
  'pune', 'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur',
  'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam', 'coimbatore',
  'kochi', 'chandigarh', 'goa', 'noida', 'gurugram', 'faridabad',
] as const;

/** Nearby city groupings for internal linking */
export const NEARBY_CITIES: Record<string, string[]> = {
  mumbai: ['pune', 'thane', 'nagpur', 'goa', 'surat'],
  delhi: ['noida', 'gurugram', 'faridabad', 'chandigarh', 'lucknow'],
  bangalore: ['hyderabad', 'chennai', 'coimbatore', 'kochi', 'pune'],
  hyderabad: ['bangalore', 'chennai', 'visakhapatnam', 'nagpur', 'pune'],
  chennai: ['bangalore', 'coimbatore', 'kochi', 'hyderabad', 'visakhapatnam'],
  kolkata: ['hyderabad', 'bhopal', 'nagpur', 'chandigarh', 'lucknow'],
  pune: ['mumbai', 'thane', 'nagpur', 'bangalore', 'ahmedabad'],
  ahmedabad: ['surat', 'mumbai', 'jaipur', 'indore', 'nagpur'],
  jaipur: ['delhi', 'ahmedabad', 'chandigarh', 'indore', 'kanpur'],
  noida: ['delhi', 'gurugram', 'faridabad', 'chandigarh', 'lucknow'],
  gurugram: ['delhi', 'noida', 'faridabad', 'chandigarh', 'jaipur'],
  goa: ['mumbai', 'pune', 'bangalore', 'coimbatore', 'kochi'],
};

/** Related niches for cross-linking */
export const RELATED_NICHES: Record<string, string[]> = {
  fashion: ['beauty', 'lifestyle', 'photography', 'art'],
  beauty: ['fashion', 'lifestyle', 'health', 'photography'],
  food: ['travel', 'lifestyle', 'fitness', 'health'],
  fitness: ['health', 'sports', 'lifestyle', 'food'],
  technology: ['gaming', 'business', 'education', 'finance'],
  travel: ['food', 'photography', 'lifestyle', 'art'],
  lifestyle: ['fashion', 'beauty', 'travel', 'food'],
  gaming: ['technology', 'comedy', 'sports', 'music'],
  education: ['business', 'finance', 'technology', 'parenting'],
  finance: ['business', 'education', 'real-estate', 'automotive'],
  health: ['fitness', 'food', 'lifestyle', 'parenting'],
  parenting: ['health', 'education', 'lifestyle', 'food'],
  sports: ['fitness', 'gaming', 'comedy', 'travel'],
  comedy: ['music', 'sports', 'lifestyle', 'gaming'],
  music: ['comedy', 'art', 'lifestyle', 'travel'],
  art: ['photography', 'fashion', 'music', 'travel'],
  photography: ['art', 'travel', 'fashion', 'lifestyle'],
  business: ['finance', 'education', 'technology', 'real-estate'],
  automotive: ['technology', 'lifestyle', 'travel', 'business'],
  'real-estate': ['business', 'finance', 'lifestyle', 'automotive'],
};

export type Niche = typeof NICHES[number];
export type City = typeof CITIES[number];

export function capitalise(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatFollowers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${Math.round(count / 1_000)}K`;
  return count.toString();
}

// ─── COUNT QUERIES ────────────────────────────────────────────────────────────

export async function getInfluencerCount(): Promise<number> {
  try {
    const result = await db.query(
      `SELECT COUNT(*) as count FROM influencers WHERE status = 'verified'`
    );
    return parseInt(result.rows[0]?.count ?? '0', 10);
  } catch {
    return 0;
  }
}

export async function getInfluencerCountByNiche(niche: string): Promise<number> {
  try {
    const result = await db.query(
      `SELECT COUNT(*) as count FROM influencers WHERE status = 'verified' AND LOWER(niche) = LOWER($1)`,
      [niche]
    );
    return parseInt(result.rows[0]?.count ?? '0', 10);
  } catch {
    return 0;
  }
}

export async function getInfluencerCountByCity(city: string): Promise<number> {
  try {
    const result = await db.query(
      `SELECT COUNT(*) as count FROM influencers WHERE status = 'verified' AND LOWER(city) = LOWER($1)`,
      [city]
    );
    return parseInt(result.rows[0]?.count ?? '0', 10);
  } catch {
    return 0;
  }
}

export async function getInfluencerCountByCityAndNiche(
  city: string,
  niche: string
): Promise<number> {
  try {
    const result = await db.query(
      `SELECT COUNT(*) as count FROM influencers WHERE status = 'verified' AND LOWER(city) = LOWER($1) AND LOWER(niche) = LOWER($2)`,
      [city, niche]
    );
    return parseInt(result.rows[0]?.count ?? '0', 10);
  } catch {
    return 0;
  }
}

// ─── INFLUENCER QUERIES ───────────────────────────────────────────────────────

export interface InfluencerRow {
  username: string;
  full_name: string;
  city: string;
  niche: string;
  followers: number;
  engagement_rate: number;
  campaign_count: number;
  avatar_url: string | null;
  bio: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  tags: string[];
  updated_at: Date;
}

export async function getAllVerifiedInfluencers(): Promise<
  Pick<InfluencerRow, 'username' | 'updated_at'>[]
> {
  try {
    const result = await db.query(
      `SELECT username, updated_at FROM influencers WHERE status = 'verified' ORDER BY updated_at DESC`
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getInfluencerByUsername(
  username: string
): Promise<InfluencerRow | null> {
  try {
    const result = await db.query(
      `SELECT * FROM influencers WHERE username = $1 AND status = 'verified' LIMIT 1`,
      [username]
    );
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getInfluencersByNiche(
  niche: string,
  limit = 12
): Promise<InfluencerRow[]> {
  try {
    const result = await db.query(
      `SELECT * FROM influencers WHERE status = 'verified' AND LOWER(niche) = LOWER($1) ORDER BY followers DESC LIMIT $2`,
      [niche, limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getInfluencersByCity(
  city: string,
  limit = 12
): Promise<InfluencerRow[]> {
  try {
    const result = await db.query(
      `SELECT * FROM influencers WHERE status = 'verified' AND LOWER(city) = LOWER($1) ORDER BY followers DESC LIMIT $2`,
      [city, limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getInfluencersByCityAndNiche(
  city: string,
  niche: string,
  limit = 12
): Promise<InfluencerRow[]> {
  try {
    const result = await db.query(
      `SELECT * FROM influencers WHERE status = 'verified' AND LOWER(city) = LOWER($1) AND LOWER(niche) = LOWER($2) ORDER BY followers DESC LIMIT $2`,
      [city, niche, limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getFeaturedInfluencers(limit = 12): Promise<InfluencerRow[]> {
  try {
    const result = await db.query(
      `SELECT * FROM influencers WHERE status = 'verified' ORDER BY followers DESC, engagement_rate DESC LIMIT $1`,
      [limit]
    );
    return result.rows;
  } catch {
    return [];
  }
}

// ─── BLOG QUERIES ─────────────────────────────────────────────────────────────

export interface BlogPostRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: Date;
  updated_at: Date;
  author_name: string;
  author_slug: string;
  author_avatar: string | null;
  og_image_url: string | null;
  tags: string[];
}

export async function getAllPublishedPosts(): Promise<
  Pick<BlogPostRow, 'slug' | 'title' | 'excerpt' | 'published_at' | 'updated_at' | 'author_name' | 'og_image_url' | 'tags'>[]
> {
  try {
    const result = await db.query(
      `SELECT slug, title, excerpt, published_at, updated_at, author_name, og_image_url, tags FROM blog_posts WHERE published = true ORDER BY published_at DESC`
    );
    return result.rows;
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostRow | null> {
  try {
    const result = await db.query(
      `SELECT * FROM blog_posts WHERE slug = $1 AND published = true LIMIT 1`,
      [slug]
    );
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllPublishedPostSlugs(): Promise<
  Pick<BlogPostRow, 'slug' | 'updated_at'>[]
> {
  try {
    const result = await db.query(
      `SELECT slug, updated_at FROM blog_posts WHERE published = true`
    );
    return result.rows;
  } catch {
    return [];
  }
}
