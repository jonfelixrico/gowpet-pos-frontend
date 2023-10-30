describe('catalog', () => {
  it('has the critical UI elements', () => {
    cy.visit('/catalog')

    cy.get('[data-cy="createBtn"]').should('exist')
    cy.get('[data-cy="itemTable"').should('exist')
  })
})
