import dotenv from 'dotenv';

/**
 * Environments officially supported by this framework.
 */
const supportedEnvironments = ['dev', 'staging'] as const;

type EnvironmentName = (typeof supportedEnvironments)[number];

/**
 * Read the requested environment.
 * Defaults to "dev" when TEST_ENV is not provided.
 */
const requestedEnvironment = process.env.TEST_ENV ?? 'dev';

/**
 * Fail immediately when an unsupported environment is provided.
 */
if (!supportedEnvironments.includes(requestedEnvironment as EnvironmentName)) {
  throw new Error(
    `Unsupported TEST_ENV: ${requestedEnvironment}. ` +
      `Supported environments: ${supportedEnvironments.join(', ')}`
  );
}

const testEnv = requestedEnvironment as EnvironmentName;

/**
 * Load the environment-specific .env file.
 *
 * dev     -> .env.dev
 * staging -> .env.staging
 */
dotenv.config({
  path: `.env.${testEnv}`,
});

/**
 * BASE_URL is mandatory.
 * Stop execution immediately if it is missing.
 */
if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is missing for environment: ${testEnv}`);
}

/**
 * Defines the structure of the environment configuration.
 */
interface EnvironmentConfig {
  name: EnvironmentName;
  baseURL: string;
}

/**
 * Centralized configuration exposed to the framework.
 */
export const environment: EnvironmentConfig = {
  name: testEnv,
  baseURL: process.env.BASE_URL,
};