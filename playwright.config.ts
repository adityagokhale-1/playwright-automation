import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// const testEnv = process.env.TEST_ENV || 'qa';
// const envPath = path.resolve(__dirname, `.env.${testEnv}`);
// load env files
dotenv.config({ path: `.env.${process.env.ENV || 'qa'}` });
dotenv.config({ path: `.env.users.${process.env.ENV || 'qa'}` });

// dynamically find users
function getUserIndices(): number[] {

  const userIndices: number[] = [];

  Object.keys(process.env).forEach(key => {

    const match = key.match(/^USER_(\d+)_USERNAME$/);

    if (match) {
      userIndices.push(Number(match[1]));
    }

  });

  const sorted = userIndices.sort((a, b) => a - b);

  // log only once
  if (!process.env.PW_WORKER_INDEX) {
    console.log("Detected users:", sorted);
  }

  return sorted;
}

const users = getUserIndices();

// console.log("Detected users:", users);

// browsers
const browsers = [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox', use: devices['Desktop Firefox'] },
  { name: 'webkit', use: devices['Desktop Safari'] },
];

// generate projects dynamically
const projects = users.flatMap(userIndex =>
  browsers.map(browser => ({
    name: `user${userIndex}-${browser.name}`,

    use: {
      ...browser.use,
      baseURL: process.env.BASE_URL,
    },

    metadata: {
      userIndex,
    },

  }))
);

// console.log('Loading env file:', path);

// dotenv.config({
//   path: envPath,
//   quiet: true,
// });

// console.log('BASE_URL after dotenv:', process.env.BASE_URL);

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: process.env.BASE_URL,

    headless: true,

    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects,

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
