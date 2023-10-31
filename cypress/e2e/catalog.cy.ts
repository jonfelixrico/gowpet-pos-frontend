describe('catalog', () => {
  it('can leave the catalog create screen', () => {
    cy.visit('/catalog/create')
    cy.get('[data-cy="back"]').click()
    cy.url().should('contain', '/catalog')
    cy.url().should('not.contain', '/catalog/create')
  })

  it('supports item creation', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="create"]').click()

    cy.url().should('contain', 'catalog/create')
    const name = `Test item ${Date.now()}`
    cy.get('[data-cy="form"] [data-cy="name"]').type(name)
    cy.get('[data-cy="form"] [data-cy="price"]').type('123.45')
    cy.get('[data-cy="submit"]').click()

    cy.url().should('contain', '/catalog')
    cy.url().should('not.contain', '/catalog/create')
    cy.get('[data-cy="table"] [data-cy="row"] [data-cy="name"]').contains(name)
  })
})
