import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  /*
   * We've encountered quite a bit of times where E2E tests ran in GitHub action runners fail because of timeouts.
   * It could be that the runner is slow since it's something like a shared instance.
   *
   * By increasing the command timeout, we're hoping that we will encounter less E2E failures due to slow runners.
   */
  defaultCommandTimeout: 30_000,
})
