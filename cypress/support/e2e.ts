// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

let authToken: string = ''

before(() => {
  const describeTitle = Cypress.currentTest.titlePath[0]
  if (describeTitle !== 'root user setup') {
    /*
     * This is to generate an auth token which will be passed before each test is executed. This makes the user
     * look authenticated to the user.
     *
     * This saves us the hassle of having to log the user in via the actual tests.
     */
    cy.request<string>({
      method: 'POST',
      body: {
        username: 'root',
        password: 'password',
      },
      url: '/api/authenticate',
    }).then((response) => {
      authToken = response.body
      cy.log('Generated test user auth token', authToken)
      Cypress.env('authToken', authToken)
    })
  }
})

beforeEach(() => {
  cy.setCookie('token', authToken)

  // This is to avoid next.js redirects from breaking the tests
  cy.on('uncaught:exception', () => false)
})
