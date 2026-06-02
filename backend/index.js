const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Database Pool
const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_TZfxecvn8Jh5@ep-empty-tree-anm5hdi7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());
app.use(express.json());

// Request logger helper
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health check API
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running' });
});

// --- Public Endpoints ---

// 1. GET /api/drops: Get live/upcoming drops
app.get('/api/drops', async (req, res) => {
    try {
        const query = `
            SELECT d.*, b.name as brand_name, b.logo_url as brand_logo
            FROM drops d
            JOIN brands b ON d.brand_id = b.id
            WHERE d.status != 'draft'
            ORDER BY d.created_at DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching drops:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. POST /api/claims: Claim a drop
app.post('/api/claims', async (req, res) => {
    const { email, fullName, dropId } = req.body;

    if (!email || !fullName || !dropId) {
        return res.status(400).json({ error: 'Email, Full Name, and Drop ID are required.' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if the drop exists, is live, and has inventory
        const dropQuery = 'SELECT * FROM drops WHERE id = $1 FOR UPDATE';
        const dropRes = await client.query(dropQuery, [dropId]);

        if (dropRes.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Drop not found.' });
        }

        const drop = dropRes.rows[0];

        if (drop.status !== 'live') {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'This drop is not currently active.' });
        }

        if (drop.inventory_remaining <= 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'This drop is sold out.' });
        }

        // Find or create the user
        let userQuery = 'SELECT id FROM users WHERE email = $1';
        let userRes = await client.query(userQuery, [email]);
        let userId;

        if (userRes.rows.length === 0) {
            const insertUserQuery = 'INSERT INTO users (email, full_name) VALUES ($1, $2) RETURNING id';
            const insertUserRes = await client.query(insertUserQuery, [email, fullName]);
            userId = insertUserRes.rows[0].id;
        } else {
            userId = userRes.rows[0].id;
        }

        // Check if user already claimed this drop
        const claimCheckQuery = 'SELECT id FROM claims WHERE user_id = $1 AND drop_id = $2';
        const claimCheckRes = await client.query(claimCheckQuery, [userId, dropId]);

        if (claimCheckRes.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'You have already claimed this drop!' });
        }

        // Create the claim
        const insertClaimQuery = "INSERT INTO claims (user_id, drop_id, status) VALUES ($1, $2, 'claimed') RETURNING id";
        await client.query(insertClaimQuery, [userId, dropId]);

        // Decrement drop inventory
        const newInventory = drop.inventory_remaining - 1;
        const newStatus = newInventory === 0 ? 'sold_out' : 'live';
        const updateDropQuery = 'UPDATE drops SET inventory_remaining = $1, status = $2 WHERE id = $3';
        await client.query(updateDropQuery, [newInventory, newStatus, dropId]);

        await client.query('COMMIT');
        res.json({ success: true, message: 'Drop claimed successfully!', inventoryRemaining: newInventory });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error claiming drop:', err);
        res.status(500).json({ error: 'Failed to claim drop.' });
    } finally {
        client.release();
    }
});

// 3. POST /api/partner: Submit brand partner application
app.post('/api/partner', async (req, res) => {
    const { brandName, category, offerDetails, contactInfo } = req.body;

    if (!brandName || !contactInfo || !offerDetails) {
        return res.status(400).json({ error: 'Brand name, email, and offer details are required.' });
    }

    try {
        const query = `
            INSERT INTO waitlist (company_name, category, offer_details, contact_email, status)
            VALUES ($1, $2, $3, $4, 'pending')
            RETURNING id;
        `;
        const result = await pool.query(query, [brandName, category || '', offerDetails, contactInfo]);
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error('Error saving waitlist submission:', err);
        res.status(500).json({ error: 'Failed to submit application.' });
    }
});

// --- Admin Endpoints ---

// Simple tokenless auth for local development using env configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@earlybird.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// 4. POST /api/admin/login: Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ success: true, token: 'earlybird-admin-authorized' });
    }
    return res.status(401).json({ error: 'Invalid admin credentials.' });
});

// 5. GET /api/admin/stats: Admin Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const claimsCount = await pool.query('SELECT COUNT(*) FROM claims');
        const activeDropsCount = await pool.query("SELECT COUNT(*) FROM drops WHERE status = 'live'");
        const pendingRequestsCount = await pool.query("SELECT COUNT(*) FROM waitlist WHERE status = 'pending'");

        res.json({
            totalClaims: parseInt(claimsCount.rows[0].count),
            activeOffers: parseInt(activeDropsCount.rows[0].count),
            partnerRequests: parseInt(pendingRequestsCount.rows[0].count)
        });
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 6. GET /api/admin/drops: List all drops
app.get('/api/admin/drops', async (req, res) => {
    try {
        const query = `
            SELECT d.*, b.name as brand_name
            FROM drops d
            JOIN brands b ON d.brand_id = b.id
            ORDER BY d.created_at DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching admin drops:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 7. POST /api/admin/drops: Create a new drop
app.post('/api/admin/drops', async (req, res) => {
    const { brandName, title, description, originalPrice, discountedPrice, inventoryTotal } = req.body;

    if (!brandName || !title || originalPrice === undefined || discountedPrice === undefined || !inventoryTotal) {
        return res.status(400).json({ error: 'Brand name, title, original price, discounted price, and total inventory are required.' });
    }

    try {
        // Find or create brand
        let brandQuery = 'SELECT id FROM brands WHERE LOWER(name) = LOWER($1)';
        let brandRes = await pool.query(brandQuery, [brandName]);
        let brandId;

        if (brandRes.rows.length === 0) {
            const insertBrandQuery = `
                INSERT INTO brands (name, contact_email, website, status)
                VALUES ($1, $2, $3, 'approved')
                RETURNING id;
            `;
            const contactEmail = `partner@${brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'brand'}.com`;
            const website = `https://${brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'brand'}.com`;
            const insertBrandRes = await pool.query(insertBrandQuery, [brandName, contactEmail, website]);
            brandId = insertBrandRes.rows[0].id;
        } else {
            brandId = brandRes.rows[0].id;
        }

        // Insert new drop
        const insertDropQuery = `
            INSERT INTO drops (brand_id, title, description, original_price, slash_price, inventory_total, inventory_remaining, status, start_time, end_time)
            VALUES ($1, $2, $3, $4, $5, $6, $6, 'live', NOW(), NOW() + INTERVAL '7 days')
            RETURNING *;
        `;
        const dropRes = await pool.query(insertDropQuery, [
            brandId,
            title,
            description || '',
            originalPrice,
            discountedPrice,
            inventoryTotal
        ]);

        res.json({ success: true, drop: dropRes.rows[0] });
    } catch (err) {
        console.error('Error adding drop:', err);
        res.status(500).json({ error: 'Failed to create drop.' });
    }
});

// 8. PATCH /api/admin/drops/:id: Update drop status (Active vs Paused)
app.patch('/api/admin/drops/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
    }

    // Map 'Active' / 'Paused' to database status values
    let dbStatus = status;
    if (status === 'Active') dbStatus = 'live';
    if (status === 'Paused') dbStatus = 'upcoming';

    try {
        const query = 'UPDATE drops SET status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [dbStatus, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Drop not found.' });
        }

        res.json({ success: true, drop: result.rows[0] });
    } catch (err) {
        console.error('Error updating drop:', err);
        res.status(500).json({ error: 'Failed to update drop status.' });
    }
});

// 9. GET /api/admin/requests: List waitlist requests
app.get('/api/admin/requests', async (req, res) => {
    try {
        const query = 'SELECT * FROM waitlist ORDER BY requested_at DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching partner requests:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 10. PATCH /api/admin/requests/:id: Update partner request status
app.patch('/api/admin/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
    }

    try {
        const query = 'UPDATE waitlist SET status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [status, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        res.json({ success: true, request: result.rows[0] });
    } catch (err) {
        console.error('Error updating partner request:', err);
        res.status(500).json({ error: 'Failed to update request status.' });
    }
});

// 11. GET /api/admin/claims: List all claims
app.get('/api/admin/claims', async (req, res) => {
    try {
        const query = `
            SELECT c.id, c.claimed_at as date, c.status, u.full_name as user_name, u.email as user_email, d.title as drop_title
            FROM claims c
            JOIN users u ON c.user_id = u.id
            JOIN drops d ON c.drop_id = d.id
            ORDER BY c.claimed_at DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching claims list:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
