describe('catalog', () => {
  it('can leave the create page', () => {
    cy.visit('/catalog/create')
    cy.get('[data-cy="back"]').click()
    cy.location('pathname').should('equal', '/catalog')
  })

  it('supports create', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="create"]').click()

    cy.location('pathname').should('equal', '/catalog/create')
    const name = `Test item ${Date.now()}`
    cy.get('[data-cy="form"] [data-cy="name"]').type(name)
    cy.get('[data-cy="form"] [data-cy="price"]').type('123.45')
    cy.get('[data-cy="submit"]').click()

    cy.location('pathname').should('equal', '/catalog')
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
        const [_, id] = ID_REGEX.exec(url) ?? [] // this shouldn't end up having an empty array value since we've tested that the Regexp is valid via "should match"

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

  it('can leave the update page', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="showDetails"]').first().click()

    cy.location('pathname').should('match', /\/catalog\/.+$/)

    cy.get('[data-cy="back"]').click()

    cy.location('pathname').should('equal', '/catalog')
  })

  it('can cancel delete', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="showDetails"]').first().click()

    cy.location('pathname').should('match', /\/catalog\/.+$/)

    cy.get('[data-cy="delete"]').click()
    const dialog = cy.get('[data-cy="delete-dialog"][data-open="true"]')
    dialog.should('exist')
    dialog.get('[data-cy="cancel"]').click()

    cy.get('[data-cy="delete-dialog"][data-open="true"]').should('not.exist')
  })

  it('supports delete', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="showDetails"]').first().click()

    cy.url()
      .should('match', ID_REGEX)
      .then((url) => {
        const [_, id] = ID_REGEX.exec(url) ?? [] // this shouldn't end up having an empty array value since we've tested that the Regexp is valid via "should match"

        // launch confirmation
        cy.get('[data-cy="delete"]').click()
        // check if dialog exists and is opened
        const dialog = cy.get('[data-cy="delete-dialog"][data-open="true"]')
        dialog.should('exist')

        // do the actual delete
        dialog.get('[data-cy="submit"]').click()

        cy.location('pathname').should('equal', '/catalog')
        // should not exist in listing
        cy.get(`[data-catalog-id="${id}"]`).should('not.exist')
      })
  })
})
