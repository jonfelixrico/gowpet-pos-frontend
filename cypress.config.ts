import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    /*
     * We've encountered quite a bit of times where E2E tests ran in GitHub action runners fail because of timeouts.
     * We can just restart those tests, but rerunning even just the failing tests can be time-consuming especially as the project
     * scales up.
     *
     * Increasing the timeout is sort of like a band-aid fix where we don't really have a choice.
     */
    defaultCommandTimeout: 30_000,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
