import { Pool } from '@neondatabase/serverless';

const connectionString =
  process.env.VITE_NEON_DATABASE_URL ||
  process.env.NEON_DATABASE_URL ||
  'postgresql://neondb_owner:npg_TZfxecvn8Jh5@ep-empty-tree-anm5hdi7-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString,
  });
} else {
  // Prevent multiple connections in development hot reload
  if (!(global as any)._postgresPool) {
    (global as any)._postgresPool = new Pool({
      connectionString,
    });
  }
  pool = (global as any)._postgresPool;
}

export const db = {
  query: async (text: string, params?: any[]) => {
    return pool.query(text, params);
  },
};
export default db;
