import { defineConfig, devices } from "@playwright/test";
import { environment } from "./src/config/environment";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  use: {
    baseURL: environment.baseURL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: { mode: "on", snapshots: true, screenshots: true, sources: true, attachments: true },
  },

  projects: [

    // 1. Authentication setup
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },

    // 2. Unauthenticated tests
    {
      name: "chromium-unauthenticated",
      testMatch: [
        /login\.spec\.ts/,
        /signup\.spec\.ts/,
      ],
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // 3. Authenticated tests
    {
      name: "chromium-authenticated",
      testIgnore: [
        /login\.spec\.ts/,
        /signup\.spec\.ts/,
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    // Firefox
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    // WebKit
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});