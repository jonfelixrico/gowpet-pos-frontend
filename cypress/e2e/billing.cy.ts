describe('billing', () => {
  const now = Date.now()

  before(() => {
    const items: Record<number, string> = {}
    for (let i = 0; i < 20; i++) {
      cy.request({
        url: 'http://localhost:3005/catalog/product',
        method: 'POST',

        body: JSON.stringify({
          name: `for billing e2e - ${now} - ${i}`,
          price: 150 + i * 10,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cypress.env('authToken')}`,
        },
      }).then((res) => {
        items[i] = res.body.id
      })
    }
  })

  it('shows 404 page for non-existent billings', () => {
    cy.visit('/billing/this-does-not-exist')

    cy.get('[data-cy="not-found"]').should('exist')
    cy.get('[data-cy="content"]').should('not.exist')
  })
})
