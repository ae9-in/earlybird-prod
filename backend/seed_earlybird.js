const { Client } = require('pg');
require('dotenv').config();

const dbUrl = process.env.VITE_NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_TZfxecvn8Jh5@ep-empty-tree-anm5hdi7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function main() {
    console.log('Seeding Early Bird database...');
    const client = new Client({
        connectionString: dbUrl,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        
        console.log('Cleaning old data...');
        // Clean claims, drops, brands, and waitlist tables
        await client.query('TRUNCATE claims, drops, brands, waitlist RESTART IDENTITY CASCADE;');

        console.log('Inserting seed brands...');
        const brandInsertQuery = `
            INSERT INTO brands (id, name, website, contact_email, status) VALUES
            ('b1111111-1111-1111-1111-111111111111', 'Notion Template Co.', 'https://notiontemplates.co', 'partner@notiontemplates.co', 'approved'),
            ('b2222222-2222-2222-2222-222222222222', 'Lumi Desk', 'https://lumidesk.com', 'partner@lumidesk.com', 'approved'),
            ('b3333333-3333-3333-3333-333333333333', 'SaaS Starter', 'https://saasstarter.dev', 'partner@saasstarter.dev', 'approved')
            RETURNING id, name;
        `;
        const brandsRes = await client.query(brandInsertQuery);
        console.log('Brands seeded:', brandsRes.rows);

        console.log('Inserting seed drops...');
        const dropsInsertQuery = `
            INSERT INTO drops (id, brand_id, title, description, original_price, slash_price, inventory_total, inventory_remaining, status, start_time, end_time) VALUES
            ('d1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'Founder OS', 'The ultimate database system to plan, build, and scale your startup. Used by 5,000+ founders.', 150.00, 49.00, 100, 45, 'live', NOW(), NOW() + INTERVAL '7 days'),
            ('d2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'Monitor Light Bar', 'Monitor light bar with smart auto-dimming, color temperature adjustment, and zero screen glare.', 129.00, 59.00, 50, 12, 'live', NOW(), NOW() + INTERVAL '3 days'),
            ('d3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'React Boilerplate', 'Production-ready boilerplate with Next.js, Stripe, Tailwind, and Supabase pre-configured.', 199.00, 79.00, 75, 75, 'upcoming', NOW() + INTERVAL '1 day', NOW() + INTERVAL '8 days')
            RETURNING id, title;
        `;
        const dropsRes = await client.query(dropsInsertQuery);
        console.log('Drops seeded:', dropsRes.rows);

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

main();
