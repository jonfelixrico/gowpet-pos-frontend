import { expect } from 'chai'

describe('catalog', () => {
  it('can leave the catalog create screen', () => {
    cy.visit('/catalog/create')
    cy.get('[data-cy="back"]').click()
    cy.url().should('contain', '/catalog')
    cy.url().should('not.contain', '/catalog/create')
  })

  it('supports create', () => {
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

  const ID_REGEX = /\/catalog\/((?:\w|\d|-)+)$/

  it('supports update', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="showDetails"]').first().click()

    // match /catalog/:id
    cy.url()
      .should('match', ID_REGEX)
      .then((url) => {
        const [_, id] = ID_REGEX.exec(url) ?? []

        // check navigation to the edit page
        cy.get('[data-cy="edit"]').click()
        cy.location('pathname').should('equal', `/catalog/${id}/edit`)

        // do data input
        const newName = `Test data ${Date.now()}`
        const newPrice = '2023.11'

        cy.get('[data-cy="name"]').clear().type(newName)
        cy.get('[data-cy="price"]').clear().type(newPrice)
        cy.get('[data-cy="submit"]').click()

        cy.location('pathname').should('equal', `/catalog/${id}`)
        cy.get('[data-cy="name"]').contains(newName)
        cy.get('[data-cy="price"]').contains(newPrice)

        cy.visit('/catalog')
        const row = cy.get(`[data-cy="row"][data-catalog-id="${id}"]`)
        row.get('[data-cy="name"]').contains(newName)
        row.get('[data-cy="price"]').contains(newPrice)
      })
  })
})
