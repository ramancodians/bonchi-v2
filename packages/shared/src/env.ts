import dotenv from 'dotenv';
import path from 'path';

// Check if we're in a browser environment (Vite) or Node.js (server)
const isBrowser = typeof window !== 'undefined';

// Load .env from project root in Node.js environment
if (!isBrowser) {
  // Load from shared package folder
  dotenv.config({ path: path.join(process.cwd(), 'packages/shared/.env') });
  // Also try from project root as fallback
  dotenv.config({ path: path.join(process.cwd(), '.env') });
}

const getEnv = (key: string, defaultValue: string = ''): string => {
  if (isBrowser) {
    // In browser (Vite), use import.meta.env
    // @ts-expect-error - import.meta.env is only available in Vite
    return (import.meta?.env?.[key] as string) || defaultValue;
  } else {
    // In Node.js (server), use process.env (loaded by dotenv above)
    return process.env[key] || defaultValue;
  }
};

export const env = {
  // API Configuration
  API_URL: getEnv('API_URL', 'http://localhost'),
  API_PORT: getEnv('API_PORT', '3001'),

  // App Configuration
  APP_URL: getEnv('APP_URL', 'http://localhost:3000'),
  APP_PORT: getEnv('APP_PORT', '3000'),

  // Database
  DATABASE_URL: getEnv('DATABASE_URL', ''),

  // Fast2SMS Configuration
  FAST2SMS_ENDPOINT: getEnv(
    'FAST2SMS_ENDPOINT',
    'https://www.fast2sms.com/dev/bulkV2'
  ),
  FAST2SMS_API_KEY: getEnv('FAST2SMS_API_KEY', ''),

  // Security
  JWT_SECRET: getEnv('JWT_SECRET', ''),

  // Environment
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  // Helpers
  get isDevelopment() {
    return this.NODE_ENV === 'development';
  },
  get isProduction() {
    return this.NODE_ENV === 'production';
  },
} as const;

export type Env = typeof env;
