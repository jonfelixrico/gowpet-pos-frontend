describe('root user setup', () => {
  it('supports making root user', () => {
    cy.visit('/root-setup')
    cy.get('[data-page=root-setup]').should('exist')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('confirm-password').type('password')
    cy.dataCy('submit').click()

    cy.get('[data-page=login]').should('exist')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname')
      .should('not.equal', '/login')
      .should('not.equal', '/root-setup')
  })

  it('prevents creating of root user more than once', () => {
    cy.visit('/root-setup')
    cy.get('[data-page=root-setup]').should('not.exist')
  })
})
