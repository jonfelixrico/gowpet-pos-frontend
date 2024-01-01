describe('user management', () => {
  it('shows the create dialog on create button click', () => {
    cy.visit('/settings/user')
    cy.get('[data-page="user-list"]').should('exist')

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
})
