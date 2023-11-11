describe('billing', () => {
  it('shows 404 page for non-existent billings', () => {
    cy.visit('/billing/this-does-not-exist')
    cy.get('[data-cy="not-found"]').should('exist')
  })
})
