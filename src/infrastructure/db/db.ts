import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const path = process.env.DATABASE_URL

if (!path) {
  throw new Error('DATABASE_URL is not defined');
}

const sqlite = new Database(path);
export const db: BetterSQLite3Database = drizzle(sqlite);
