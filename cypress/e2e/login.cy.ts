describe('login', () => {
  it('can log in', () => {
    cy.setCookie('token', '')
    cy.visit('/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('not.equal', '/login')
  })

  it('should not show the login page to already-authenticated users', () => {
    cy.visit('/login')
    cy.location('pathname').should('not.equal', '/login')
  })

  it('redirects to initial page on login', () => {
    cy.setCookie('token', '')

    cy.visit('/catalog?pageNo=1&searchTerm=test')
    cy.location('pathname').should('equal', '/login')

    cy.dataCy('username').type('root')
    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()

    cy.location('pathname').should('equal', '/catalog')

    // ordering is not guaranteed so we're not checking `search` entirely
    cy.location('search').should('contain', 'pageNo=1')
    cy.location('search').should('contain', 'searchTerm=test')
  })
})
