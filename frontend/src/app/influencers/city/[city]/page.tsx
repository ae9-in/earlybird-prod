import type { Metadata } from 'next';
import Link from 'next/link';
import {
  NICHES,
  CITIES,
  NEARBY_CITIES,
  capitalise,
  getInfluencerCountByCity,
  getInfluencersByCity,
} from '../../../../lib/queries';
import { BreadcrumbSchema, FAQSchema } from '../../../../components/seo/schemas';
import '../../influencers.css';

export const revalidate = 3600;

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const cityLabel = capitalise(params.city);
  const count = await getInfluencerCountByCity(params.city);
  const displayCount = count || 200;

  return {
    title: `Brand Promoters in ${cityLabel} — Hire Verified Influencers | EarlyBird India`,
    description:
      `Find ${displayCount}+ brand promoters and influencers in ${cityLabel}. ` +
      `Connect with local Instagram, YouTube & Reels creators for your next campaign. ` +
      `Free for brands. EarlyBird India.`,
    alternates: {
      canonical: `https://www.earlybirdindia.online/influencers/city/${params.city}`,
    },
    openGraph: {
      title: `Brand Promoters in ${cityLabel} | EarlyBird India`,
      description: `${displayCount}+ verified influencers in ${cityLabel}. Book local creators for Instagram, YouTube & Reels campaigns.`,
      url: `https://www.earlybirdindia.online/influencers/city/${params.city}`,
      images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const cityLabel = capitalise(params.city);
  const [count, influencers] = await Promise.all([
    getInfluencerCountByCity(params.city),
    getInfluencersByCity(params.city, 12),
  ]);
  const displayCount = count || 200;
  const nearby = NEARBY_CITIES[params.city] ?? CITIES.filter((c) => c !== params.city).slice(0, 5);

  const faqs = [
    {
      q: `How do I hire an influencer in ${cityLabel}?`,
      a: `Browse EarlyBird India's ${displayCount}+ verified influencers in ${cityLabel}. Filter by niche, platform, and follower count. Book directly with no agency fees or markups.`,
    },
    {
      q: `Which niches are most popular among ${cityLabel} influencers?`,
      a: `${cityLabel} has strong creator communities in fashion, food, fitness, and tech. EarlyBird India lets you filter ${cityLabel} influencers by any of 20 content niches.`,
    },
    {
      q: `Are there micro-influencers available in ${cityLabel}?`,
      a: `Yes. EarlyBird India has nano-influencers (1K–10K followers) and micro-influencers (10K–100K followers) based in ${cityLabel} — ideal for hyper-local campaigns with high engagement rates.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.earlybirdindia.online' },
          { name: 'Influencers', url: 'https://www.earlybirdindia.online/influencers' },
          { name: `${cityLabel} Influencers`, url: `https://www.earlybirdindia.online/influencers/city/${params.city}` },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <main className="influencers-page">
        <section className="inf-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
              <Link href="/influencers">Influencers</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">{cityLabel}</span>
            </nav>
            <h1 className="inf-hero-title">
              Brand Promoters &amp; Influencers in {cityLabel}
            </h1>
            <p className="inf-hero-subtitle">
              Discover {displayCount}+ verified brand promoters and content creators in {cityLabel}.
              Find Instagram, YouTube &amp; Reels influencers for local campaigns. Free for brands.
            </p>
            <div className="inf-stats-row">
              <div className="inf-stat"><strong>{displayCount}+</strong><span>Creators in {cityLabel}</span></div>
              <div className="inf-stat"><strong>20+</strong><span>Content Niches</span></div>
              <div className="inf-stat"><strong>Free</strong><span>For Brands</span></div>
            </div>
          </div>
        </section>

        {/* Editorial */}
        <section className="inf-section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 className="inf-section-title">About Brand Promoters in {cityLabel}</h2>
            <div className="inf-editorial">
              <p>
                {cityLabel} is one of India&apos;s most vibrant creator economies, with thousands of content
                creators building audiences across Instagram, YouTube, and short-form video platforms.
                Brands partnering with {cityLabel}-based influencers benefit from authentic local voices
                that resonate with regional audiences, cultures, and buying patterns.
              </p>
              <p>
                EarlyBird India connects you with {displayCount}+ verified brand promoters in {cityLabel} —
                from nano-influencers with hyper-engaged local audiences to macro-influencers with
                city-wide reach. Each creator is manually vetted for authenticity, engagement quality,
                and content standards.
              </p>
              <p>
                Whether you need a {cityLabel} food blogger for a restaurant launch, a fitness creator
                for a gym brand, or a tech reviewer for a product drop, EarlyBird India makes the
                connection instant and transparent — with clear rates and no agency commissions.
              </p>
            </div>
          </div>
        </section>

        {/* Browse by niche in this city */}
        <section className="inf-section inf-section--alt">
          <div className="container">
            <h2 className="inf-section-title">Browse {cityLabel} Influencers by Niche</h2>
            <p className="inf-section-sub">Find the right {cityLabel.toLowerCase()} creator for your industry</p>
            <div className="niche-grid">
              {NICHES.map((niche) => (
                <Link key={niche} href={`/influencers/city/${params.city}/category/${niche}`} className="niche-card">
                  <span className="niche-name">{capitalise(niche)}</span>
                  <span className="niche-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured in this city */}
        {influencers.length > 0 && (
          <section className="inf-section">
            <div className="container">
              <h2 className="inf-section-title">Verified Influencers in {cityLabel}</h2>
              <div className="featured-grid">
                {influencers.map((inf) => (
                  <Link key={inf.username} href={`/influencers/${inf.username}`} className="inf-card">
                    {inf.avatar_url && (
                      <img src={inf.avatar_url} alt={`${inf.full_name} — influencer in ${cityLabel}`}
                        className="inf-card-avatar" width={56} height={56} loading="lazy" />
                    )}
                    <div className="inf-card-body">
                      <h3 className="inf-card-name">{inf.full_name}</h3>
                      <p className="inf-card-meta">{capitalise(inf.niche)}</p>
                      <p className="inf-card-stats">
                        {inf.followers >= 1000 ? `${Math.round(inf.followers / 1000)}K` : inf.followers} followers · {inf.engagement_rate}% eng.
                      </p>
                    </div>
                    <span className="inf-card-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Nearby cities */}
        <section className="inf-section inf-section--alt">
          <div className="container">
            <h2 className="inf-section-title">Influencers in Nearby Cities</h2>
            <div className="city-grid">
              {nearby.map((c) => (
                <Link key={c} href={`/influencers/city/${c}`} className="city-card">
                  <span className="city-name">{capitalise(c)}</span>
                  <span className="city-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="inf-section">
          <div className="container inf-faq">
            <h2 className="inf-section-title">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
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
