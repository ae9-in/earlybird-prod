import type { Metadata } from 'next';
import Link from 'next/link';
import {
  NICHES,
  CITIES,
  RELATED_NICHES,
  NEARBY_CITIES,
  capitalise,
  getInfluencerCountByCityAndNiche,
  getInfluencersByCityAndNiche,
} from '../../../../../../lib/queries';
import { BreadcrumbSchema, FAQSchema } from '../../../../../../components/seo/schemas';
import '../../../../influencers.css';

export const revalidate = 3600;

export async function generateStaticParams() {
  // Pre-build top 5 cities × all niches at deploy time; rest served on-demand with ISR
  const topCities = ['mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai'];
  return topCities.flatMap((city) => NICHES.map((niche) => ({ city, niche })));
}

export async function generateMetadata({
  params,
}: {
  params: { city: string; niche: string };
}): Promise<Metadata> {
  const cityLabel = capitalise(params.city);
  const nicheLabel = capitalise(params.niche);
  const count = await getInfluencerCountByCityAndNiche(params.city, params.niche);
  const displayCount = count || 50;

  return {
    title: `${displayCount}+ ${nicheLabel} Influencers in ${cityLabel} — Hire Verified Creators | EarlyBird India`,
    description:
      `Find and hire verified ${nicheLabel} influencers in ${cityLabel}. ` +
      `Browse profiles, compare rates, and book ${nicheLabel.toLowerCase()} content creators ` +
      `in ${cityLabel} directly on EarlyBird India. No agency fees.`,
    alternates: {
      canonical: `https://www.earlybirdindia.online/influencers/city/${params.city}/category/${params.niche}`,
    },
    openGraph: {
      title: `${nicheLabel} Influencers in ${cityLabel} | EarlyBird India`,
      description: `${displayCount}+ verified ${nicheLabel} creators in ${cityLabel}. Book directly. No agency fees.`,
      url: `https://www.earlybirdindia.online/influencers/city/${params.city}/category/${params.niche}`,
      images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function CityNichePage({
  params,
}: {
  params: { city: string; niche: string };
}) {
  const cityLabel = capitalise(params.city);
  const nicheLabel = capitalise(params.niche);
  const [count, influencers] = await Promise.all([
    getInfluencerCountByCityAndNiche(params.city, params.niche),
    getInfluencersByCityAndNiche(params.city, params.niche, 12),
  ]);
  const displayCount = count || 50;

  const related = RELATED_NICHES[params.niche] ?? NICHES.filter((n) => n !== params.niche).slice(0, 4);
  const nearby = NEARBY_CITIES[params.city] ?? CITIES.filter((c) => c !== params.city).slice(0, 5);

  const faqs = [
    {
      q: `How do I find ${nicheLabel} influencers in ${cityLabel}?`,
      a: `EarlyBird India lists ${displayCount}+ verified ${nicheLabel} content creators based in ${cityLabel}. Browse by follower count, platform, and engagement rate. Book directly with no middlemen.`,
    },
    {
      q: `What is the average cost of a ${nicheLabel} influencer in ${cityLabel}?`,
      a: `${nicheLabel} influencer rates in ${cityLabel} vary: nano creators (1K–10K followers) charge ₹500–₹5,000 per post, while micro-influencers (10K–100K) charge ₹5,000–₹50,000. Book transparently via EarlyBird India.`,
    },
    {
      q: `Are there nano and micro ${nicheLabel} influencers in ${cityLabel}?`,
      a: `Yes. EarlyBird India has nano and micro ${nicheLabel} influencers in ${cityLabel} with high engagement rates — perfect for brands targeting local ${cityLabel} audiences on a focused budget.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.earlybirdindia.online' },
          { name: 'Influencers', url: 'https://www.earlybirdindia.online/influencers' },
          { name: `${cityLabel}`, url: `https://www.earlybirdindia.online/influencers/city/${params.city}` },
          { name: `${nicheLabel} in ${cityLabel}`, url: `https://www.earlybirdindia.online/influencers/city/${params.city}/category/${params.niche}` },
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
              <Link href={`/influencers/city/${params.city}`}>{cityLabel}</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">{nicheLabel}</span>
            </nav>
            <h1 className="inf-hero-title">
              {nicheLabel} Influencers in {cityLabel}
            </h1>
            <p className="inf-hero-subtitle">
              Find {displayCount}+ verified {nicheLabel.toLowerCase()} brand promoters and content creators
              in {cityLabel}. Browse profiles, compare rates, and book directly — no agency fees.
            </p>
            <div className="inf-stats-row">
              <div className="inf-stat"><strong>{displayCount}+</strong><span>{nicheLabel} Creators in {cityLabel}</span></div>
              <div className="inf-stat"><strong>Free</strong><span>For Brands</span></div>
            </div>
          </div>
        </section>

        {/* Editorial */}
        <section className="inf-section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 className="inf-section-title">{nicheLabel} Creators in {cityLabel} — 2026 Guide</h2>
            <div className="inf-editorial">
              <p>
                {cityLabel} has a thriving community of {nicheLabel.toLowerCase()} content creators who
                collaborate with brands across Instagram, YouTube, and short-form video. For brands
                targeting consumers in {cityLabel}, working with local {nicheLabel.toLowerCase()} influencers
                delivers authentic engagement that out-performs generic national campaigns.
              </p>
              <p>
                EarlyBird India&apos;s {cityLabel} {nicheLabel.toLowerCase()} creator directory is updated
                in real-time with verified profiles, transparent pricing, and campaign history. You can
                filter by follower tier (nano, micro, macro), platform (Instagram, YouTube, Reels), and
                engagement rate to find the perfect brand promoter for your campaign.
              </p>
              <p>
                Booking a {nicheLabel.toLowerCase()} influencer in {cityLabel} through EarlyBird India
                takes under 5 minutes. All creators are verified for authentic follower counts and
                engagement quality — no fake followers, no inflated metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Influencer cards */}
        {influencers.length > 0 ? (
          <section className="inf-section inf-section--alt">
            <div className="container">
              <h2 className="inf-section-title">Verified {nicheLabel} Creators in {cityLabel}</h2>
              <div className="featured-grid">
                {influencers.map((inf) => (
                  <Link key={inf.username} href={`/influencers/${inf.username}`} className="inf-card">
                    {inf.avatar_url && (
                      <img src={inf.avatar_url} alt={`${inf.full_name} — ${nicheLabel} influencer in ${cityLabel}`}
                        className="inf-card-avatar" width={56} height={56} loading="lazy" />
                    )}
                    <div className="inf-card-body">
                      <h3 className="inf-card-name">{inf.full_name}</h3>
                      <p className="inf-card-meta">{capitalise(inf.niche)} · {capitalise(inf.city)}</p>
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
        ) : (
          <section className="inf-section inf-section--alt">
            <div className="container">
              <div className="inf-empty-state">
                <h2>Growing Creator Network in {cityLabel}</h2>
                <p>
                  We&apos;re onboarding {nicheLabel} creators in {cityLabel} right now.
                  <Link href="/influencers"> Browse all influencers</Link> or
                  <Link href="/#partner"> partner with us</Link> to be featured.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Other niches in this city */}
        <section className="inf-section">
          <div className="container">
            <h2 className="inf-section-title">Other Niches in {cityLabel}</h2>
            <div className="niche-grid">
              {related.map((n) => (
                <Link key={n} href={`/influencers/city/${params.city}/category/${n}`} className="niche-card">
                  <span className="niche-name">{capitalise(n)}</span>
                  <span className="niche-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Same niche, nearby cities */}
        <section className="inf-section inf-section--alt">
          <div className="container">
            <h2 className="inf-section-title">{nicheLabel} Influencers in Nearby Cities</h2>
            <div className="city-grid">
              {nearby.map((c) => (
                <Link key={c} href={`/influencers/city/${c}/category/${params.niche}`} className="city-card">
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
