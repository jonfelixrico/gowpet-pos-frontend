describe('catalog', () => {
  it('has the critical UI elements', () => {
    cy.get('[data-cy="create-btn"]').should('exist')
    cy.get('[data-cy="table"').should('exist')
  })
})
