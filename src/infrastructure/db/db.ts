import { createClient } from '@libsql/client';
import { drizzle as drizzleLibSql } from 'drizzle-orm/libsql';

const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error('DATABASE_URL is not defined');
}

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzleLibSql(client);
