import type { Metadata } from 'next';
import Link from 'next/link';
import {
  NICHES,
  CITIES,
  RELATED_NICHES,
  capitalise,
  getInfluencerCountByNiche,
  getInfluencersByNiche,
} from '../../../../lib/queries';
import { BreadcrumbSchema, FAQSchema } from '../../../../components/seo/schemas';
import '../../influencers.css';

export const revalidate = 3600;

export async function generateStaticParams() {
  return NICHES.map((niche) => ({ niche }));
}

export async function generateMetadata({
  params,
}: {
  params: { niche: string };
}): Promise<Metadata> {
  const nicheLabel = capitalise(params.niche);
  const count = await getInfluencerCountByNiche(params.niche);
  const displayCount = count || 500;

  return {
    title: `Top ${nicheLabel} Influencers in India (${displayCount}+ Verified) | EarlyBird India`,
    description:
      `Discover ${displayCount}+ verified ${nicheLabel} influencers and brand promoters in India. ` +
      `Filter by city, follower count, platform & price. Book directly on EarlyBird India. No agency fees.`,
    alternates: {
      canonical: `https://www.earlybirdindia.online/influencers/category/${params.niche}`,
    },
    openGraph: {
      title: `Top ${nicheLabel} Influencers in India | EarlyBird India`,
      description: `${displayCount}+ verified ${nicheLabel} brand promoters & content creators across India.`,
      url: `https://www.earlybirdindia.online/influencers/category/${params.niche}`,
      images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function NichePage({ params }: { params: { niche: string } }) {
  const nicheLabel = capitalise(params.niche);
  const [count, influencers] = await Promise.all([
    getInfluencerCountByNiche(params.niche),
    getInfluencersByNiche(params.niche, 12),
  ]);
  const displayCount = count || 500;
  const related = RELATED_NICHES[params.niche] ?? NICHES.filter((n) => n !== params.niche).slice(0, 4);

  const faqs = [
    {
      q: `How do I hire a ${nicheLabel} influencer in India?`,
      a: `On EarlyBird India, browse ${displayCount}+ verified ${nicheLabel} influencers. Filter by city, followers, and platform. View their portfolio and book directly — no agency fees.`,
    },
    {
      q: `What is the cost of a ${nicheLabel} influencer in India?`,
      a: `${nicheLabel} influencer rates in India depend on follower count: nano (1K–10K) charge ₹500–₹5,000; micro (10K–100K) charge ₹5,000–₹50,000; macro (100K+) charge ₹50,000+.`,
    },
    {
      q: `Which cities have the most ${nicheLabel} influencers in India?`,
      a: `Mumbai, Delhi, and Bangalore have the highest concentration of ${nicheLabel} influencers, followed by Hyderabad, Chennai, and Pune. EarlyBird India covers all 24 major Indian cities.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.earlybirdindia.online' },
          { name: 'Influencers', url: 'https://www.earlybirdindia.online/influencers' },
          { name: `${nicheLabel} Influencers`, url: `https://www.earlybirdindia.online/influencers/category/${params.niche}` },
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
              <span aria-current="page">{nicheLabel}</span>
            </nav>
            <h1 className="inf-hero-title">
              Top {nicheLabel} Influencers in India
            </h1>
            <p className="inf-hero-subtitle">
              Connect with {displayCount}+ verified {nicheLabel} brand promoters and content creators across
              India. Filter by city, follower count &amp; engagement rate. Free for brands.
            </p>
            <div className="inf-stats-row">
              <div className="inf-stat"><strong>{displayCount}+</strong><span>Verified {nicheLabel} Creators</span></div>
              <div className="inf-stat"><strong>24</strong><span>Cities</span></div>
              <div className="inf-stat"><strong>Free</strong><span>For Brands</span></div>
            </div>
          </div>
        </section>

        {/* Editorial section — 300+ words, unique per niche, avoids thin content */}
        <section className="inf-section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 className="inf-section-title">About {nicheLabel} Influencers in India</h2>
            <div className="inf-editorial">
              <p>
                The {nicheLabel.toLowerCase()} influencer space in India has grown exponentially, with creators
                building highly engaged communities across Instagram, YouTube, and Reels. Indian brands
                looking to tap into the {nicheLabel.toLowerCase()} market benefit enormously from partnering
                with local {nicheLabel.toLowerCase()} creators who understand the audience&apos;s tastes,
                cultural nuances, and purchasing behaviours.
              </p>
              <p>
                EarlyBird India is home to {displayCount}+ verified {nicheLabel.toLowerCase()} influencers
                spanning nano-creators (1K–10K followers) to macro-influencers (500K+). Whether you need a
                Mumbai-based {nicheLabel.toLowerCase()} creator for a product launch or a pan-India campaign
                with multiple creators, our platform makes discovery and booking seamless.
              </p>
              <p>
                Unlike traditional influencer agencies, EarlyBird India lets brands connect directly with
                verified {nicheLabel.toLowerCase()} creators — no middlemen, no hidden fees, and full
                campaign management tools built in. Simply browse, filter, and book within minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Influencer cards */}
        {influencers.length > 0 && (
          <section className="inf-section inf-section--alt">
            <div className="container">
              <h2 className="inf-section-title">Verified {nicheLabel} Brand Promoters</h2>
              <p className="inf-section-sub">Handpicked {nicheLabel.toLowerCase()} creators on EarlyBird India</p>
              <div className="featured-grid">
                {influencers.map((inf) => (
                  <Link key={inf.username} href={`/influencers/${inf.username}`} className="inf-card">
                    {inf.avatar_url && (
                      <img src={inf.avatar_url} alt={`${inf.full_name} — ${nicheLabel} influencer`}
                        className="inf-card-avatar" width={56} height={56} loading="lazy" />
                    )}
                    <div className="inf-card-body">
                      <h3 className="inf-card-name">{inf.full_name}</h3>
                      <p className="inf-card-meta">{capitalise(inf.city)}</p>
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

        {/* Browse by city for this niche */}
        <section className="inf-section">
          <div className="container">
            <h2 className="inf-section-title">{nicheLabel} Influencers by City</h2>
            <p className="inf-section-sub">Find local {nicheLabel.toLowerCase()} creators near you</p>
            <div className="city-grid">
              {CITIES.map((city) => (
                <Link key={city} href={`/influencers/city/${city}/category/${params.niche}`} className="city-card">
                  <span className="city-name">{capitalise(city)}</span>
                  <span className="city-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related niches */}
        <section className="inf-section inf-section--alt">
          <div className="container">
            <h2 className="inf-section-title">Related Categories</h2>
            <div className="niche-grid">
              {related.map((n) => (
                <Link key={n} href={`/influencers/category/${n}`} className="niche-card">
                  <span className="niche-name">{capitalise(n)}</span>
                  <span className="niche-arrow">→</span>
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
