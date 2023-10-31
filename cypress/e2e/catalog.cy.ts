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

  it('supports item update', () => {
    cy.visit('/catalog')
    cy.get('[data-cy="showDetails"]').first().click()

    const idRegex = /\/catalog\/((?:\w|\d|-)+)$/
    // match /catalog/:id
    cy.url().should('match', idRegex)

    let id = ''
    cy.url().then((url) => {
      const [_, extractedId] = idRegex.exec(url) ?? []
      id = extractedId
    })

    // check navigation to the edit page
    cy.get('[data-cy="edit"]').click()
    cy.url().should('equal', `/catalog/${id}/edit`)

    // do data input
    const newName = `Test data ${Date.now()}`
    const newPrice = '2023.11'

    cy.get('[data-cy="name"]').type(newName)
    cy.get('[data-cy="price"]').type(newPrice)
    cy.get('[data-cy="submit"]').click()

    cy.url().should('equal', `/catalog/${id}`)
    cy.get('[data-cy="name"]').contains(newName)
    cy.get('[data-cy="price"]').contains(newPrice)

    cy.visit('/catalog')
    cy.get(`[data-cy="row"][data-catalog-id="${id}"]`).should('exist')
  })
})
