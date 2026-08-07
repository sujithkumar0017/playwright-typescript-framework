import dotenv from 'dotenv';

const testEnv = process.env.TEST_ENV ?? 'dev';

dotenv.config({
  path: `.env.${testEnv}`,
});

if (!process.env.BASE_URL) {
  throw new Error(
    `BASE_URL is missing for environment: ${testEnv}`
  );
}

export const environment = {
  name: testEnv,
  baseURL: process.env.BASE_URL,
};