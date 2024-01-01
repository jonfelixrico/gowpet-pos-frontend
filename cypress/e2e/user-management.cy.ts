describe('user management', () => {
  it('shows the create dialog on create button click', () => {
    cy.visit('/settings/user')
    cy.get('[data-page="user-list"]').should('exist')
    cy.dataCy('create-dialog').should('not.exist')

    cy.dataCy('create').click()
    cy.location('pathname').should('equal', '/settings/user/create')
    cy.dataCy('create-dialog').should('exist')
  })

  it('shows the create dialog on direct path access', () => {
    cy.visit('/settings/user/create')

    // on the background, it should still show the user list
    cy.get('[data-page="user-list"]').should('exist')

    cy.location('pathname').should('equal', '/settings/user/create')
    cy.dataCy('create-dialog').should('exist')
  })

  it('returns to user list on dialog close', () => {
    cy.visit('/settings/user/create')
    cy.dataCy('create-dialog').should('exist')

    cy.dataCy('cancel').click()
    cy.location('pathname').should('equal', '/settings/user')
    cy.dataCy('create-dialog').should('not.exist')
  })
})
