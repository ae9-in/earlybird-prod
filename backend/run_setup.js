const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbUrl = process.env.VITE_NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_TZfxecvn8Jh5@ep-empty-tree-anm5hdi7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function main() {
    console.log('Connecting to database...');
    const client = new Client({
        connectionString: dbUrl,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Connected! Reading db_setup.sql...');
        
        const sqlPath = path.join(__dirname, 'db_setup.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('Running SQL statements...');
        await client.query(sql);
        console.log('Database tables setup successfully!');
    } catch (err) {
        console.error('Error running setup:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

main();
