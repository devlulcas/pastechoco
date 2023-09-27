import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({
  path: '.env.local',
});

const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error('DATABASE_URL is not defined');
}

export default {
  schema: './src/infrastructure/db',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
