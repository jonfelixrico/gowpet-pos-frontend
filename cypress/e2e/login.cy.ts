describe('login', () => {
  it('can log in', () => {
    cy.setCookie('token', '')
    cy.visit('/login')

    cy.get('[data-cy="username"]').type('root')
    cy.get('[data-cy="password"]').type('password')
    cy.get('[data-cy="submit"]').click()

    cy.url().should('not.include', 'login')
  })
})
