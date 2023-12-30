describe('root user setup', () => {
  it('should be able to make a root user', () => {
    cy.visit('/root-setup')
    cy.location('pathname').should('equal', '/root-setup')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('confirm-password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('equal', '/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname')
      .should('not.equal', '/login')
      .should('not.equal', '/root-setup')
  })
})
