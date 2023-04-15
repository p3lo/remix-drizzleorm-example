import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import type { InsertProfile } from './schema';
import { profiles } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export async function init() {
  await migrate(db, { migrationsFolder: './app/db/migrations' });
}

export async function insertProfile(profile: InsertProfile) {
  try {
    const result = await db.insert(profiles).values(profile).onConflictDoNothing({ target: profiles.id });
    return { insertedId: result, error: null };
  } catch (e) {
    return { insertedId: null, error: e };
  }
}
