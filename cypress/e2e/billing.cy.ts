interface TestCatalogItem {
  id: string
  name: string
  price: number
}

describe('billing', () => {
  const now = Date.now()
  const items: TestCatalogItem[] = []

  before(() => {
    for (let i = 0; i < 20; i++) {
      const data = {
        name: `for billing e2e - ${now} - ${i}`,
        price: 150 + i * 10,
      }

      cy.request({
        url: 'http://localhost:3005/catalog/product',
        method: 'POST',

        body: JSON.stringify(data),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cypress.env('authToken')}`,
        },
      }).then((res) => {
        items.push({
          ...data,
          id: res.body.id,
        })
      })
    }
  })

  it('shows 404 page for non-existent billings', () => {
    cy.visit('/billing/this-does-not-exist')

    cy.get('[data-cy="not-found"]').should('exist')
    cy.get('[data-cy="content"]').should('not.exist')
  })

  it('can do happy path for billing create', () => {
    cy.visit('/billing/create')

    // start adding items to populate the billing item table

    cy.get('[data-cy="add-items"]').click()
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] input').type(
      `for billing e2e - ${now}`
    )
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] button').click()

    const toAdd = items.slice(0, 5)

    for (const { id } of toAdd) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="catalog-item"][data-catalog-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // check if the items in the billing items table checks out with what we added

    cy.get('[data-cy="billing-item"]').should('have.length', toAdd.length)

    toAdd.forEach(({ id, price }, index) => {
      // this makes sure that we're showing the critical information per item

      cy.get(`[data-billing-item-id="${id}"] [data-cy="price"]`).should(
        'contain',
        price
      )

      for (let i = 0; i < index; i++) {
        cy.get(`[data-billing-item-id="${id}"] [data-cy="increment"]`).click()
      }

      cy.get(`[data-billing-item-id="${id}"] [data-cy="amount"]`).should(
        'contain',
        price * (1 + index)
      )

      cy.get(`[data-billing-item-id="${id}"] [data-cy="quantity"]`).should(
        'contain',
        1 + index
      )
    })

    cy.get('[data-cy="notes"]').type('test notes')

    // test that saving works
    cy.get('[data-cy="save"]').click()
    cy.get(
      '[data-cy="save-confirmation-dialog"][data-dialog-open="true"] [data-cy="ok"]'
    ).click()

    cy.location('pathname').should('not.equal', '/billing/create')
    cy.location('pathname').should('match', /\/billing\/\S+$/)

    /*
     * We're only checking user-inputted fields here.
     * We'll assume that the other UI elements are correct since they should have their own
     * tests.
     */

    cy.get('[data-cy="notes"]').should('have.value', 'test notes')
    cy.get('[data-cy="items-table"] [data-cy="row"]').should('have.length', 5)

    toAdd.forEach(({ name, price }, index) => {
      cy.get(
        `[data-cy="items-table"] [data-cy="row"]:nth-child(${
          index + 1
        }) [data-cy="name"]`
      ).should('have.text', name)

      cy.get(
        `[data-cy="items-table"] [data-cy="row"]:nth-child(${
          index + 1
        }) [data-cy="price"]`
      ).should('have.text', price)

      cy.get(
        `[data-cy="items-table"] [data-cy="row"]:nth-child(${
          index + 1
        }) [data-cy="quantity"]`
      ).should('have.text', 1 + index)
    })
  })
})
