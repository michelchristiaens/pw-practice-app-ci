import { chromium, defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import 'dotenv/config'
//import dotenv from 'dotenv';
//import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  //globalTimeout: 30 * 1000, // Set a global timeout of 30 seconds for all tests
  //timeout: 30 * 1000, // Set a timeout of 30 seconds for each test
  expect: {    
    timeout: 5 * 1000, // Set a timeout of 5 seconds for expect conditions
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,//!!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: "argos_3319c9b485da748dff545eb400591e4b63",
      },
    ],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    //['allure-playwright'],
    ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200',
    // baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
    //   : process.env.STAGING === '1' ? 'http://localhost:4202'
    //   : 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 5000, // Set a timeout of 5 seconds for each action
    navigationTimeout: 2 * 60 * 1000, // Set a timeout of 5 seconds for navigation actions    
    // video: {
    //   mode: 'on',
    //   size: {width: 1920, height: 1080}
    // }
    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        browserName: 'chromium',
        baseURL: 'http://localhost:4201'
       },
    },
    
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile',
      testMatch: 'testMobile.spec.ts',
      use: { ...devices['iPhone 13 Pro'] },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    timeout: 2 * 60 * 1000,
    command: 'npm run start',
    url: 'http://localhost:4200',
    //reuseExistingServer: !process.env.CI,
  },
});
