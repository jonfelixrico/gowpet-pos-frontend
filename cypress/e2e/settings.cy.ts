describe('settings', () => {
  it('redirects to the default subpage on navigate to /settings', () => {
    cy.visit('/settings')
    cy.location('pathname').should('equal', '/settings/billing')
  })

  it('can navigate via the tabs', () => {
    cy.visit('/settings/user')
    cy.get('[data-page="user-list"]').should('exist')

    cy.get('[data-tab="billing"]').click()
    cy.get('[data-page="billing-settings"]').should('exist')
  })

  it('shows the billing subpage', () => {
    cy.visit('/settings/billing')

    cy.get('[data-tab=billing]').should('have.attr', 'data-active', 'true')
    cy.get('[data-page=billing-settings]').should('exist')
  })

  it('shows the user subpage', () => {
    cy.visit('/settings/user')

    cy.get('[data-tab=user]').should('have.attr', 'data-active', 'true')
    cy.get('[data-page=user-list]').should('exist')
  })
})
