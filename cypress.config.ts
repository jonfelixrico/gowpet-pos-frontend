import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },

  reporterOptions: {
    mochaFile: 'cypress/results/output.xml',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
