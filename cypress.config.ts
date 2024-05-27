import { defineConfig } from 'cypress'

export default {
  e2e: {
    'baseUrl': 'http://localhost:4204',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
