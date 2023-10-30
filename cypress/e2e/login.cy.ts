describe('login', () => {
  it('can log in', () => {
    cy.setCookie('token', '')
    cy.visit('/login')

    cy.get('[data-cy="username"]').type('root')
    cy.get('[data-cy="password"]').type('password')
    cy.get('[data-cy="submit"]').click()

    cy.url().should('include', 'catalog')
  })

  it('should not show the login page to already-authenticated users', () => {
    cy.visit('/login')
    cy.url().should('include', 'catalog')
  })
})
