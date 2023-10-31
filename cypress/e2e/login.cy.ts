describe('login', () => {
  it('can log in', () => {
    cy.setCookie('token', '')
    cy.visit('/login')

    cy.get('[data-cy="username"]').type('root')
    cy.get('[data-cy="password"]').type('password')
    cy.get('[data-cy="submit"]').click()

    cy.location('pathname').should('not.equal', '/login')
  })

  it('should not show the login page to already-authenticated users', () => {
    cy.visit('/login')
    cy.location('pathname').should('not.equal', '/login')
  })
})
