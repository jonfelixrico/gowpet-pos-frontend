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

    const toAdd = items.filter((_, index) => index % 2 === 0)

    for (const { id } of toAdd) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="catalog-item"][data-catalog-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // check if the items in the billing items table checks out with what we added

    cy.get('[data-cy="items-table"] [data-cy="row"]').should(
      'have.length',
      toAdd.length
    )
    for (const { id, price } of toAdd) {
      // this makes sure that we're showing the critical information per item

      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="price"]`
      ).should('contain', price)
      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="quantity"]`
      ).should('contain', 1)
      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="amount"]`
      ).should('contain', price)
    }

    // this makes sure that we're displaying the correct billing-wide information
    cy.get('[data-cy="total-amount"]').should(
      'contain',
      toAdd.reduce((total, { price }) => total + price, 0)
    )

    // test that saving works
    cy.get('[data-cy="save"]').click()
    cy.get(
      '[data-cy="save-confirmation-dialog"][data-dialog-open="true"] [data-cy="ok"]'
    ).click()
    cy.location('pathname').should('match', /\/billing\/.+$/)
  })

  it('handles delete', () => {
    cy.visit('/billing/create')

    // add items to populate the table
    cy.get('[data-cy="add-items"]').click()
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] input').type(
      `for billing e2e - ${now}`
    )
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] button').click()

    for (const { id } of items) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="catalog-item"][data-catalog-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // start deleting each item
    const toDelete = items.filter((_, index) => index % 2 === 0)
    for (const { id } of toDelete) {
      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="delete"]`
      ).click()

      cy.get(
        `[data-cy="delete-confirm"][data-dialog-open="true"] [data-cy="ok"]`
      ).click()

      cy.get(`[data-cy="items-table"] [data-billing-item-id="${id}"]`).should(
        'not.exist'
      )
    }

    // make sure that items which aren't supposed to be deleted are not removed somehow
    const toKeep = items.filter((_, index) => index % 2 !== 0)
    for (const { id } of toKeep) {
      cy.get(`[data-cy="items-table"] [data-billing-item-id="${id}"]`).should(
        'exist'
      )
    }

    // to make sure that deleted items aren't contributing to the total anymore
    cy.get('[data-cy="total-amount"]').should(
      'contain',
      toKeep.reduce((total, { price }) => total + price, 0)
    )
  })

  it('has the edit functionality for each billing item', () => {
    cy.visit('/billing/create')

    // this is to populate the billing items table with catalog items
    cy.get('[data-cy="add-items"]').click()
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] input').type(
      `for billing e2e - ${now}`
    )
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] button').click()

    const toAdd = items.filter((_, index) => index % 2 === 0)

    for (const { id } of toAdd) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="catalog-item"][data-catalog-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // this is to test the increment button
    toAdd.forEach(({ id }, index) => {
      // do setting
      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="edit"]`
      ).click()
      cy.get('[data-cy="dialog"][data-dialog-open="true"] [data-cy="quantity"]')
        .clear()
        .type(String(1 + index))
      cy.get(
        '[data-cy="dialog"][data-dialog-open="true"] [data-cy="ok"]'
      ).click()

      // verify setting
      cy.get(
        `[data-cy="items-table"] [data-billing-item-id="${id}"] [data-cy="quantity"]`
      ).should('contain', 1 + index)
    })
  })
})
