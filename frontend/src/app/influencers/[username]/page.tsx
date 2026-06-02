import type { Metadata } from 'next';
import Link from 'next/link';
import {
  capitalise,
  formatFollowers,
  getInfluencerByUsername,
  getAllVerifiedInfluencers,
} from '../../../lib/queries';
import { InfluencerSchema, BreadcrumbSchema } from '../../../components/seo/schemas';
import '../influencers.css';
import './profile.css';

export const revalidate = 3600;

export async function generateStaticParams() {
  const influencers = await getAllVerifiedInfluencers();
  return influencers.map((inf) => ({ username: inf.username }));
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const inf = await getInfluencerByUsername(params.username);
  if (!inf) return { title: 'Influencer Not Found | EarlyBird India' };

  const followerDisplay = formatFollowers(inf.followers);
  const nicheLabel = capitalise(inf.niche);
  const cityLabel = capitalise(inf.city);

  return {
    title: `${inf.full_name} — ${nicheLabel} Influencer (${followerDisplay} followers) | EarlyBird India`,
    description:
      `Hire ${inf.full_name}, a verified ${nicheLabel} influencer from ${cityLabel}, India ` +
      `with ${followerDisplay} followers and ${inf.engagement_rate}% engagement rate. ` +
      `View portfolio, rates & availability on EarlyBird India.`,
    alternates: {
      canonical: `https://www.earlybirdindia.online/influencers/${params.username}`,
    },
    openGraph: {
      title: `${inf.full_name} | ${nicheLabel} Brand Influencer`,
      description: `${followerDisplay} followers · ${inf.engagement_rate}% engagement · Based in ${cityLabel}`,
      url: `https://www.earlybirdindia.online/influencers/${params.username}`,
      images: [
        {
          url: inf.avatar_url ?? '/og/default.jpg',
          width: 800,
          height: 800,
          alt: `${inf.full_name} profile photo`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${inf.full_name} | ${nicheLabel} Influencer`,
      description: `${followerDisplay} followers · ${inf.engagement_rate}% engagement`,
      images: [inf.avatar_url ?? '/og/default.jpg'],
    },
  };
}

export default async function InfluencerProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const inf = await getInfluencerByUsername(params.username);

  if (!inf) {
    return (
      <main className="influencers-page">
        <section className="inf-hero">
          <div className="container">
            <h1 className="inf-hero-title">Influencer Not Found</h1>
            <p className="inf-hero-subtitle">
              This creator profile doesn&apos;t exist or hasn&apos;t been verified yet.
            </p>
            <Link href="/influencers" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Browse All Influencers →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const nicheLabel = capitalise(inf.niche);
  const cityLabel = capitalise(inf.city);
  const followerDisplay = formatFollowers(inf.followers);

  const influencerData = {
    username: inf.username,
    fullName: inf.full_name,
    city: inf.city,
    niche: inf.niche,
    followers: inf.followers,
    engagementRate: Number(inf.engagement_rate),
    campaignCount: inf.campaign_count,
    avatarUrl: inf.avatar_url ?? undefined,
    bio: inf.bio ?? undefined,
    instagramUrl: inf.instagram_url ?? undefined,
    youtubeUrl: inf.youtube_url ?? undefined,
    linkedinUrl: inf.linkedin_url ?? undefined,
    tags: inf.tags,
  };

  return (
    <>
      <InfluencerSchema influencer={influencerData} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.earlybirdindia.online' },
          { name: 'Influencers', url: 'https://www.earlybirdindia.online/influencers' },
          { name: nicheLabel, url: `https://www.earlybirdindia.online/influencers/category/${inf.niche}` },
          { name: inf.full_name, url: `https://www.earlybirdindia.online/influencers/${inf.username}` },
        ]}
      />

      <main className="influencers-page">
        <div className="container">
          <nav className="breadcrumb" style={{ paddingTop: '2rem' }} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <Link href="/influencers">Influencers</Link>
            <span aria-hidden="true"> › </span>
            <Link href={`/influencers/category/${inf.niche}`}>{nicheLabel}</Link>
            <span aria-hidden="true"> › </span>
            <span aria-current="page">{inf.full_name}</span>
          </nav>

          <div className="profile-layout">
            {/* Left — Profile card */}
            <aside className="profile-card">
              {inf.avatar_url && (
                <img
                  src={inf.avatar_url}
                  alt={`${inf.full_name} — ${nicheLabel} influencer in ${cityLabel}`}
                  className="profile-avatar"
                  width={160}
                  height={160}
                />
              )}
              <div className="profile-verified">✓ Verified Creator</div>
              <h1 className="profile-name">{inf.full_name}</h1>
              <p className="profile-title">{nicheLabel} Content Creator · {cityLabel}</p>

              <div className="profile-stats">
                <div className="p-stat">
                  <strong>{followerDisplay}</strong>
                  <span>Followers</span>
                </div>
                <div className="p-stat">
                  <strong>{inf.engagement_rate}%</strong>
                  <span>Engagement</span>
                </div>
                <div className="p-stat">
                  <strong>{inf.campaign_count}</strong>
                  <span>Campaigns</span>
                </div>
              </div>

              {/* Social links */}
              <div className="profile-socials">
                {inf.instagram_url && (
                  <a href={inf.instagram_url} rel="noopener noreferrer" target="_blank" className="social-link">
                    Instagram ↗
                  </a>
                )}
                {inf.youtube_url && (
                  <a href={inf.youtube_url} rel="noopener noreferrer" target="_blank" className="social-link">
                    YouTube ↗
                  </a>
                )}
                {inf.linkedin_url && (
                  <a href={inf.linkedin_url} rel="noopener noreferrer" target="_blank" className="social-link">
                    LinkedIn ↗
                  </a>
                )}
              </div>

              <Link href="/#partner" className="profile-cta">
                Book This Creator →
              </Link>
            </aside>

            {/* Right — Bio + details */}
            <div className="profile-main">
              <section className="profile-section">
                <h2>About {inf.full_name}</h2>
                <p>
                  {inf.bio ||
                    `${inf.full_name} is a verified ${nicheLabel} content creator based in ${cityLabel}, India. ` +
                    `With ${followerDisplay} followers and a ${inf.engagement_rate}% engagement rate, ` +
                    `they deliver high-impact brand collaborations across Instagram and YouTube.`}
                </p>
              </section>

              {inf.tags.length > 0 && (
                <section className="profile-section">
                  <h2>Content Topics</h2>
                  <div className="profile-tags">
                    {inf.tags.map((tag) => (
                      <span key={tag} className="profile-tag">#{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              <section className="profile-section">
                <h2>Platform Presence</h2>
                <div className="platform-grid">
                  {inf.instagram_url && <div className="platform-item"><strong>Instagram</strong><span>Primary Platform</span></div>}
                  {inf.youtube_url && <div className="platform-item"><strong>YouTube</strong><span>Video Content</span></div>}
                  {inf.linkedin_url && <div className="platform-item"><strong>LinkedIn</strong><span>Professional</span></div>}
                </div>
              </section>

              <div className="profile-cta-block">
                <h3>Ready to collaborate with {inf.full_name}?</h3>
                <p>Submit a partnership request and our team will connect you within 24 hours.</p>
                <Link href="/#partner" className="btn-primary">
                  Start Collaboration →
                </Link>
              </div>
            </div>
          </div>

          {/* Internal links to niche + city pages */}
          <div className="profile-related">
            <Link href={`/influencers/category/${inf.niche}`} className="related-link">
              More {nicheLabel} Influencers in India →
            </Link>
            <Link href={`/influencers/city/${inf.city}`} className="related-link">
              More Influencers in {cityLabel} →
            </Link>
            <Link href={`/influencers/city/${inf.city}/category/${inf.niche}`} className="related-link">
              {nicheLabel} Influencers in {cityLabel} →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
