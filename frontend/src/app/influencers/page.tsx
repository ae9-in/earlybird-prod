import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/schemas';
import { NICHES, CITIES, capitalise, getFeaturedInfluencers, getInfluencerCount } from '../../lib/queries';
import './influencers.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Find Brand Promoters & Influencers in India | EarlyBird India',
  description:
    'Browse 50,000+ verified brand promoters and influencers in India. ' +
    'Filter by niche, city, follower count, platform and price range. ' +
    'Connect with fashion, food, fitness, tech creators. Free for brands.',
  alternates: {
    canonical: 'https://www.earlybirdindia.online/influencers',
  },
  openGraph: {
    title: 'Find Brand Promoters & Influencers in India | EarlyBird India',
    description: 'Browse 50,000+ verified brand promoters and influencers across India. Free for brands.',
    url: 'https://www.earlybirdindia.online/influencers',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
};

const influencerDiscoveryFaqs = [
  {
    q: 'How do I find the right influencer for my brand in India?',
    a: 'Use EarlyBird India\'s filters to browse by niche (fashion, food, tech, etc.), city (Mumbai, Delhi, Bangalore), follower count, and engagement rate. Every creator is verified by our team.',
  },
  {
    q: 'What types of influencers are available on EarlyBird India?',
    a: 'We have nano-influencers (1K–10K followers), micro-influencers (10K–100K), macro-influencers (100K–1M), and mega-influencers across 20+ niches including fashion, beauty, food, fitness, tech, and travel.',
  },
  {
    q: 'Can I search for influencers by city in India?',
    a: 'Yes. EarlyBird India lets you filter influencers by city — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, and 16 more Indian cities.',
  },
];

export default async function InfluencersPage() {
  const [totalCount, featuredInfluencers] = await Promise.all([
    getInfluencerCount(),
    getFeaturedInfluencers(6),
  ]);

  const displayCount = totalCount || 50000;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.earlybirdindia.online' },
          { name: 'Influencers', url: 'https://www.earlybirdindia.online/influencers' },
        ]}
      />
      <FAQSchema faqs={influencerDiscoveryFaqs} />

      <main className="influencers-page">
        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="inf-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">Influencers</span>
            </nav>
            <h1 className="inf-hero-title">
              Brand Promoters &amp; Influencers in India
            </h1>
            <p className="inf-hero-subtitle">
              Browse {displayCount.toLocaleString()}+ verified brand promoters, micro-influencers &amp;
              content creators across India. Filter by niche, city &amp; platform — free for brands.
            </p>
            <div className="inf-stats-row">
              <div className="inf-stat"><strong>{displayCount.toLocaleString()}+</strong><span>Verified Creators</span></div>
              <div className="inf-stat"><strong>20+</strong><span>Content Niches</span></div>
              <div className="inf-stat"><strong>24</strong><span>Cities Covered</span></div>
              <div className="inf-stat"><strong>Free</strong><span>For Brands</span></div>
            </div>
          </div>
        </section>

        {/* ── BROWSE BY NICHE ─────────────────────────────────────── */}
        <section className="inf-section">
          <div className="container">
            <h2 className="inf-section-title">Browse by Niche</h2>
            <p className="inf-section-sub">Find creators who specialise in your industry</p>
            <div className="niche-grid">
              {NICHES.map((niche) => (
                <Link
                  key={niche}
                  href={`/influencers/category/${niche}`}
                  className="niche-card"
                >
                  <span className="niche-name">{capitalise(niche)}</span>
                  <span className="niche-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BROWSE BY CITY ───────────────────────────────────────── */}
        <section className="inf-section inf-section--alt">
          <div className="container">
            <h2 className="inf-section-title">Browse by City</h2>
            <p className="inf-section-sub">Connect with local influencers across India</p>
            <div className="city-grid">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/influencers/city/${city}`}
                  className="city-card"
                >
                  <span className="city-name">{capitalise(city)}</span>
                  <span className="city-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED INFLUENCERS ─────────────────────────────────── */}
        {featuredInfluencers.length > 0 && (
          <section className="inf-section">
            <div className="container">
              <h2 className="inf-section-title">Featured Creators</h2>
              <p className="inf-section-sub">Top verified brand promoters on EarlyBird India</p>
              <div className="featured-grid">
                {featuredInfluencers.map((inf) => (
                  <Link
                    key={inf.username}
                    href={`/influencers/${inf.username}`}
                    className="inf-card"
                  >
                    {inf.avatar_url && (
                      <img
                        src={inf.avatar_url}
                        alt={`${inf.full_name} profile`}
                        className="inf-card-avatar"
                        width={64}
                        height={64}
                        loading="lazy"
                      />
                    )}
                    <div className="inf-card-body">
                      <h3 className="inf-card-name">{inf.full_name}</h3>
                      <p className="inf-card-meta">
                        {capitalise(inf.niche)} · {capitalise(inf.city)}
                      </p>
                      <p className="inf-card-stats">
                        {inf.followers >= 1000
                          ? `${Math.round(inf.followers / 1000)}K`
                          : inf.followers} followers · {inf.engagement_rate}% engagement
                      </p>
                    </div>
                    <span className="inf-card-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="inf-section inf-section--alt">
          <div className="container inf-faq">
            <h2 className="inf-section-title">Common Questions</h2>
            {influencerDiscoveryFaqs.map((faq, i) => (
              <details key={i} className="inf-faq-item">
                <summary className="inf-faq-q">{faq.q}</summary>
                <p className="inf-faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
