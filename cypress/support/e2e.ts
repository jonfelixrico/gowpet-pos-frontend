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
  const creds = {
    username: 'root',
    password: 'password',
  }

  cy.request({
    method: 'POST',
    body: creds,
    url: '/api/debug/user',
    failOnStatusCode: false,
  })

  cy.request<string>({
    method: 'POST',
    body: creds,
    url: '/api/authenticate',
  }).then((response) => {
    authToken = response.body
    cy.log('Generated test user auth token', authToken)
  })
})

beforeEach(() => {
  cy.setCookie('token', authToken)

  // This is to avoid next.js redirects from breaking the tests
  cy.on('uncaught:exception', () => false)
})
