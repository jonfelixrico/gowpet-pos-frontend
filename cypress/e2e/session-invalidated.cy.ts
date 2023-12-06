describe('session invalidated', () => {
  it('supports mid-session invalidation flow', () => {
    // test path choice was arbitrary
    cy.visit('/billing/create')
    // just to smoke-test that the user has been logged in
    cy.location('pathname').should('equal', '/billing/create')

    cy.setCookie('token', 'now invalidated')
    cy.reload()

    cy.location('pathname').should('equal', '/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('not.equal', '/login')
  })
})
