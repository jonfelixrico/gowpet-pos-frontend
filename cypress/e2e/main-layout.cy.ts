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
})
