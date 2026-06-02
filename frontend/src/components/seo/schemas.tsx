import React from 'react';

// Homepage Schema: Organization + WebSite + SiteLinksSearchBox
export function HomepageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.earlybirdindia.online/#organization',
        name: 'EarlyBird India',
        url: 'https://www.earlybirdindia.online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.earlybirdindia.online/favicon.png',
          width: 512,
          height: 512,
        },
        description:
          'India\'s leading brand promoter and influencer marketing platform connecting brands with verified content creators.',
        foundingDate: '2023',
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@earlybirdindia.online',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          'https://www.instagram.com/earlybirdindia',
          'https://www.linkedin.com/company/earlybirdindia',
          'https://twitter.com/earlybirdindia',
          'https://www.youtube.com/@earlybirdindia',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.earlybirdindia.online/#website',
        url: 'https://www.earlybirdindia.online',
        name: 'EarlyBird India',
        publisher: { '@id': 'https://www.earlybirdindia.online/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              'https://www.earlybirdindia.online/influencers?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Influencer Schema: Person + ProfilePage + BreadcrumbList
export interface Influencer {
  username: string;
  fullName: string;
  city: string;
  niche: string;
  followers: number;
  engagementRate: number;
  campaignCount: number;
  avatarUrl?: string;
  bio?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  tags?: string[];
}

export function InfluencerSchema({ influencer }: { influencer: Influencer }) {
  const displayCity = influencer.city.charAt(0).toUpperCase() + influencer.city.slice(1);
  const displayNiche = influencer.niche.charAt(0).toUpperCase() + influencer.niche.slice(1);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `https://www.earlybirdindia.online/influencers/${influencer.username}#person`,
      name: influencer.fullName,
      alternateName: influencer.username,
      description: influencer.bio || `Verified ${displayNiche} content creator based in ${displayCity}, India.`,
      image: influencer.avatarUrl || 'https://www.earlybirdindia.online/og/default-influencer.jpg',
      jobTitle: `${displayNiche} Content Creator`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: displayCity,
        addressCountry: 'IN',
      },
      sameAs: [
        influencer.instagramUrl,
        influencer.youtubeUrl,
        influencer.linkedinUrl,
      ].filter(Boolean),
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/FollowAction',
          userInteractionCount: influencer.followers,
        },
      ],
      knowsAbout: influencer.tags || [],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.earlybirdindia.online' },
        { '@type': 'ListItem', position: 2, name: 'Influencers', item: 'https://www.earlybirdindia.online/influencers' },
        { '@type': 'ListItem', position: 3, name: influencer.fullName, item: `https://www.earlybirdindia.online/influencers/${influencer.username}` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Software Application Schema
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EarlyBird India Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free for brands',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema helper for list pages
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
