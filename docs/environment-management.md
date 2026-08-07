# Environment Management

## Overview

This framework supports multiple test environments without requiring changes to the Playwright configuration or test code.

Currently supported environments:

- Development (`dev`)
- Staging (`staging`)

The environment is selected when executing the tests.

---

## Architecture

```text
npm run test:dev
        │
        ▼
TEST_ENV=dev
        │
        ▼
src/config/environment.ts
        │
        ▼
.env.dev
        │
        ▼
BASE_URL
        │
        ▼
playwright.config.ts
        │
        ▼
Playwright Tests
```

The same flow applies to staging:

```text
npm run test:staging
        │
        ▼
TEST_ENV=staging
        │
        ▼
.env.staging
        │
        ▼
Playwright Tests
```

---

## Environment Files

Environment-specific configuration is stored in files located in the project root.

```text
.env.dev
.env.staging
.env.example
```

Example `.env.dev`:

```env
BASE_URL=https://practicesoftwaretesting.com
```

Example `.env.staging`:

```env
BASE_URL=https://practicesoftwaretesting.com
```

The practice application currently uses the same URL for both environments.

In a real project, these would normally point to different application environments.

---

## Environment Template

The repository contains:

```text
.env.example
```

This file documents the environment variables required by the framework.

Example:

```env
BASE_URL=https://example.com
```

After cloning the repository, developers can use this file as a reference when creating their local environment files.

---

## Important Security Rule

Real environment files must never be committed to Git.

The `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example
```

Therefore:

```text
.env.dev       ❌ Not committed
.env.staging   ❌ Not committed
.env.example   ✅ Committed
```

Environment files may eventually contain sensitive values such as:

- User credentials
- API keys
- Authentication tokens
- Service URLs
- Other environment-specific configuration

Never store real secrets in `.env.example`.

---

## Environment Selection

The framework uses the `TEST_ENV` environment variable to determine which configuration file should be loaded.

Examples:

```text
TEST_ENV=dev
```

loads:

```text
.env.dev
```

and:

```text
TEST_ENV=staging
```

loads:

```text
.env.staging
```

If `TEST_ENV` is not provided, the framework defaults to:

```text
dev
```

---

## Supported Environments

Supported environments are defined in:

```text
src/config/environment.ts
```

```ts
const supportedEnvironments = ['dev', 'staging'] as const;
```

This prevents accidental execution against an unknown environment.

For example:

```text
TEST_ENV=banana
```

will fail immediately because `banana` is not a supported environment.

---

## Configuration Loader

Environment loading is centralized in:

```text
src/config/environment.ts
```

Its responsibilities are:

1. Determine the requested environment.
2. Validate that the environment is supported.
3. Load the corresponding `.env` file.
4. Validate required environment variables.
5. Expose typed configuration to the rest of the framework.

The rest of the framework should use:

```ts
environment.baseURL
```

instead of directly accessing:

```ts
process.env.BASE_URL
```

This keeps environment handling centralized.

---

## Fail-Fast Validation

`BASE_URL` is mandatory.

If it is missing, the framework throws an error before test execution begins.

Example:

```text
Error: BASE_URL is missing for environment: dev
```

This prevents tests from starting with an invalid configuration.

---

## Typed Configuration

The framework defines an environment configuration contract:

```ts
interface EnvironmentConfig {
  name: EnvironmentName;
  baseURL: string;
}
```

The exported configuration follows this structure:

```ts
export const environment: EnvironmentConfig = {
  name: testEnv,
  baseURL: process.env.BASE_URL,
};
```

This provides TypeScript validation for framework configuration.

---

## Playwright Integration

`playwright.config.ts` imports the centralized environment configuration:

```ts
import { environment } from './src/config/environment';
```

The application URL is then configured using:

```ts
use: {
  baseURL: environment.baseURL,
}
```

Tests can therefore navigate using relative URLs:

```ts
await page.goto('/');
```

instead of hardcoding:

```ts
await page.goto('https://practicesoftwaretesting.com/');
```

---

## Execution Commands

Run tests against development:

```bash
npm run test:dev
```

Run tests against staging:

```bash
npm run test:staging
```

The scripts internally set the appropriate `TEST_ENV`.

---

## Adding a New Environment

For example, if a `qa` environment is introduced:

### 1. Add the environment

Update:

```ts
const supportedEnvironments = ['dev', 'staging', 'qa'] as const;
```

### 2. Create the local environment file

```text
.env.qa
```

Example:

```env
BASE_URL=https://qa.example.com
```

### 3. Add an npm script

```json
"test:qa": "cross-env TEST_ENV=qa playwright test"
```

### 4. Execute

```bash
npm run test:qa
```

No test code should need to be modified.

---

## Key Design Principle

Environment-specific information belongs in the configuration layer, not inside tests.

```text
Tests
  │
  │ should not know
  │ where configuration comes from
  ▼
Playwright Config
  │
  ▼
Environment Configuration
  │
  ▼
Environment Files
```

This allows the same automation tests to execute against different environments without modifying the test implementation.