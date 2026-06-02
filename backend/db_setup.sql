-- Create tables for advanced SEO features: influencers and blog posts

-- 1. Influencers Table
CREATE TABLE IF NOT EXISTS influencers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    niche VARCHAR(100) NOT NULL,
    followers INTEGER NOT NULL DEFAULT 0,
    engagement_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    campaign_count INTEGER NOT NULL DEFAULT 0,
    avatar_url VARCHAR(500),
    bio TEXT,
    instagram_url VARCHAR(255),
    youtube_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    tags TEXT[] NOT NULL DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on search criteria
CREATE INDEX IF NOT EXISTS idx_influencers_city ON influencers(city);
CREATE INDEX IF NOT EXISTS idx_influencers_niche ON influencers(niche);
CREATE INDEX IF NOT EXISTS idx_influencers_status ON influencers(status);

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    author_name VARCHAR(255) NOT NULL,
    author_slug VARCHAR(255) NOT NULL,
    author_avatar VARCHAR(500),
    og_image_url VARCHAR(500),
    tags TEXT[] NOT NULL DEFAULT '{}'
);

-- Index on blog slugs and published status
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Seed Initial Data
INSERT INTO influencers (username, full_name, city, niche, followers, engagement_rate, campaign_count, avatar_url, bio, instagram_url, youtube_url, linkedin_url, tags, status)
VALUES
('rohan_tech', 'Rohan Sharma', 'mumbai', 'technology', 150000, 4.20, 24, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200', 'Tech reviewer and gadget enthusiast from Mumbai. Sharing daily setups and smartphone reviews.', 'https://instagram.com/rohan_tech', 'https://youtube.com/rohan_tech', 'https://linkedin.com/in/rohan_tech', ARRAY['tech', 'gadgets', 'reviews', 'unboxing'], 'verified'),
('sneha_fashion', 'Sneha Patel', 'mumbai', 'fashion', 280000, 5.80, 42, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', 'Fashion blogger focusing on sustainable outfits, ethnic wear, and daily styling guides in Mumbai.', 'https://instagram.com/sneha_fashion', NULL, NULL, ARRAY['fashion', 'styling', 'sustainable', 'ootd'], 'verified'),
('arjun_food', 'Arjun Kapoor', 'delhi', 'food', 95000, 7.10, 18, 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200', 'Delhi food explorer. Uncovering the best street food, hidden gems, and fine dining across NCR.', 'https://instagram.com/arjun_food', 'https://youtube.com/arjun_food', NULL, ARRAY['food', 'streetfood', 'delhifood', 'recipes'], 'verified'),
('priya_fitness', 'Priya Nair', 'bangalore', 'fitness', 120000, 3.90, 15, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', 'Certified fitness coach in Bangalore. Helping you build sustainable habits, workouts, and nutrition plans.', 'https://instagram.com/priya_fitness', NULL, 'https://linkedin.com/in/priya_fitness', ARRAY['fitness', 'workout', 'nutrition', 'yoga'], 'verified'),
('ananya_beauty', 'Ananya Sen', 'kolkata', 'beauty', 180000, 4.50, 29, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', 'Skincare and beauty creator based in Kolkata. Honesty reviews on makeup and Ayurvedic skincare.', 'https://instagram.com/ananya_beauty', 'https://youtube.com/ananya_beauty', NULL, ARRAY['beauty', 'skincare', 'makeup', 'tutorials'], 'verified'),
('karan_travel', 'Karan Mehta', 'goa', 'travel', 240000, 6.20, 35, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', 'Travel filmmaker documenting heritage sites, beaches, and local cultures in India. Currently based in Goa.', 'https://instagram.com/karan_travel', 'https://youtube.com/karan_travel', NULL, ARRAY['travel', 'vlog', 'filmmaking', 'backpacking'], 'verified')
ON CONFLICT (username) DO NOTHING;

INSERT INTO blog_posts (slug, title, excerpt, content, published, author_name, author_slug, author_avatar, og_image_url, tags)
VALUES
(
  'what-is-brand-promoter-india-guide',
  'What is a brand promoter? Complete guide for Indian brands (2026)',
  'A brand promoter is essential to scaling modern campaigns. Learn how to hire brand promoters in India and drive zero-CAC growth.',
  '## What is a Brand Promoter?\n\nA brand promoter represents your product or service directly to consumers, driving high conversions and authentic brand advocacy. Unlike traditional ads, promoters create localized interest.\n\n## Why Indian Brands Need Promoters\n\n1. **Scarcity and Trust:** Indian shoppers trust word-of-mouth recommendations over generic celebrity endorsements.\n2. **Zero-CAC Advantage:** Driving traffic through niche communities yields a higher conversion rate with lower acquisition costs.\n3. **Indian Regional Languages:** Connecting with promoters speaking local languages (Hindi, Tamil, Kannada) helps tap into Tier-2 and Tier-3 markets.',
  true,
  'Aditya Deshmukh',
  'aditya-deshmukh',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  ARRAY['brand promoter', 'marketing', 'india', 'growth-hacks']
),
(
  'instagram-influencer-rates-india-pricing',
  'Instagram influencer rates in India: full pricing breakdown',
  'How much do influencers really cost in India? Read the complete rate guide for nano, micro, and macro creators in 2026.',
  '## Influencer Rates Breakdown in India (2026)\n\nNavigating influencer marketing pricing can be challenging. Here is the typical cost per post/reel based on follower brackets:\n\n* **Nano Influencers (1k - 10k followers):** ₹500 to ₹5,000\n* **Micro Influencers (10k - 100k followers):** ₹5,000 to ₹50,000\n* **Macro Influencers (100k - 500k followers):** ₹50,000 to ₹1,500,000\n* **Mega / Celebrities (500k+ followers):** ₹1.5L and above\n\n## Factors Affecting Pricing\n\n1. **Engagement Rate:** A creator with a 7% engagement rate commands a premium.\n2. **Niche Exclusivity:** Tech and finance creators charge more than general lifestyle creators due to highly targeted audiences.\n3. **Content Format:** Reels and long-form YouTube integrations have higher production value and cost more than simple static stories.',
  true,
  'Sneha Iyer',
  'sneha-iyer',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
  ARRAY['influencer rates', 'instagram', 'pricing', 'roi']
)
ON CONFLICT (slug) DO NOTHING;
