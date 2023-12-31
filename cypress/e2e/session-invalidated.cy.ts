describe('session invalidated', () => {
  it('handles mid-session invalidation when navigating to protected route', () => {
    // test path choice was arbitrary
    cy.visit('/billing/create')
    // just to smoke-test that the user has been logged in
    cy.location('pathname').should('equal', '/billing/create')

    cy.setCookie('token', 'now invalidated')
    cy.reload() // equivalent to navigating to a protected route since you're reloading /billing/create

    cy.location('pathname').should('equal', '/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('not.equal', '/login')
  })

  it('handles mid-session invalidation with manual navigation to login', () => {
    // test path choice was arbitrary
    cy.visit('/billing/create')
    // just to smoke-test that the user has been logged in
    cy.location('pathname').should('equal', '/billing/create')

    cy.setCookie('token', 'now invalidated')
    cy.visit('/login')
    cy.location('pathname').should('equal', '/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('not.equal', '/login')
  })
})
