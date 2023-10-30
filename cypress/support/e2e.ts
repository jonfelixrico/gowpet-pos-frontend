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
  cy.request({
    method: 'POST',
    body: {
      username: 'username',
      password: 'password',
    },
    url: '/api/authenticate',
  }).then((response) => {
    authToken = response.body
  })
})

beforeEach(() => {
  cy.setCookie('token', authToken)
})
