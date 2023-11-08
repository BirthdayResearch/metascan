const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "uwd79u",
  fixturesFolder: false,
  viewportWidth: 1440,
  viewportHeight: 1000,
  requestTimeout: 8000,
  defaultCommandTimeout: 8000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.ts")(on, config);
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "cypress/e2e/pages/transaction/[tid].spec.ts",
      "cypress/e2e/pages/transaction/TokenMinting.spec.ts",
    ],
  },
});
