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

    // start adding items

    cy.get('[data-cy="add-items"]').click()
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] input').type(
      `for billing e2e - ${now}`
    )
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] button').click()

    const toAdd = items.filter((_, index) => index % 2 === 0)

    for (const { id } of toAdd) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="item"][data-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // check if the items in the billing items table checks out with what we added

    cy.get('[data-cy="items-table"] [data-cy="row"]').should(
      'have.length',
      toAdd.length
    )
    for (const { id, price } of toAdd) {
      // inspection of critical UI elements for each item
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="price"]`
      ).should('contain', price)
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="quantity"]`
      ).should('contain', 1)
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="amount"]`
      ).should('contain', price)
    }

    // inspection of critical UI elements for the entire billing
    cy.get('[data-cy="total-amount"]').should(
      'contain',
      toAdd.reduce((total, { price }) => total + price, 0)
    )

    cy.get('[data-cy="save"]').click()
    cy.get(
      '[data-cy="save-confirmation-dialog"][data-dialog-open="true"] [data-cy="ok"]'
    ).click()

    cy.location('pathname').should('match', /\/billing\/.+$/)
  })

  it('handles quantity increment and decrement', () => {
    cy.visit('/billing/create')
    cy.get('[data-cy="add-items"]').click()
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] input').type(
      `for billing e2e - ${now}`
    )
    cy.get('[data-cy="add-items-dialog"] [data-cy="search"] button').click()

    const toAdd = items.filter((_, index) => index % 2 === 0)

    for (const { id } of toAdd) {
      cy.get(
        `[data-cy="add-items-dialog"] [data-cy="item"][data-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    toAdd.forEach(({ id, price }, index) => {
      for (let clickCtr = 0; clickCtr < index; clickCtr++) {
        cy.get(
          `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="increment"]`
        ).click()
      }

      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="quantity"]`
      ).should('contain', 1 + index)
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="amount"]`
      ).should('contain', price * (1 + index))
    })

    toAdd.forEach(({ id, price }, index) => {
      for (let clickCtr = 0; clickCtr < index; clickCtr++) {
        cy.get(
          `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="decrement"]`
        ).click()
      }

      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="quantity"]`
      ).should('contain', 1)
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="amount"]`
      ).should('contain', price)
    })
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
        `[data-cy="add-items-dialog"] [data-cy="item"][data-item-id="${id}"] [data-cy="add"]`
      ).click()
    }
    cy.get('[data-cy="add-items-dialog"] [data-cy="close"]').click()

    // start deleting each item
    const toDelete = items.filter((_, index) => index % 2 === 0)
    for (const { id } of toDelete) {
      cy.get(
        `[data-cy="items-table"] [data-item-id="${id}"] [data-cy="delete"]`
      ).click()

      cy.get(
        `[data-cy="confirmation-dialog"][data-dialog-open="true"] [data-cy="ok"]`
      ).click()

      cy.get(`[data-cy="items-table"] [data-item-id="${id}"]`).should(
        'not.exist'
      )
    }

    // make sure that items which aren't supposed to be deleted are not removed somehow
    const toKeep = items.filter((_, index) => index % 2 !== 0)
    for (const { id } of toKeep) {
      cy.get(`[data-cy="items-table"] [data-item-id="${id}"]`).should('exist')
    }

    // to make sure that deleted items aren't contributing to the total anymore
    cy.get('[data-cy="total-amount"]').should(
      'contain',
      toKeep.reduce((total, { price }) => total + price, 0)
    )
  })
})
