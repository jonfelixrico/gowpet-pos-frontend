describe('main-layout', () => {
  it('can navigate via the drawer', () => {
    cy.visit('/catalog')

    cy.dataCy('drawer-btn').click()
    cy.get(
      '[data-cy="drawer"][data-opened="true"] [data-route-link="billing"]'
    ).click()

    // test if we're in the billings list
    cy.location('pathname').should('equal', '/billing')
  })

  it('can log out', () => {
    cy.visit('/catalog')

    cy.dataCy('drawer-btn').click()
    cy.get('[data-cy="drawer"][data-opened="true"] [data-cy="logout"]').click()

    cy.get(
      '[data-cy="logout-confirmation"][data-dialog-opened="true"] [data-cy="ok"]'
    ).click()

    cy.location('pathname').should('equal', '/login')

    // verify if we've really been logged out by checking if we're getting redirected to the login page
    cy.visit('/')
    cy.location('pathname').should('equal', '/login')
  })
})
