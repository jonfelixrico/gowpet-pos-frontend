import CatalogContent from '@/app/(main)/catalog/CatalogContent'

describe('CatalogContenet', () => {
  it('shows the empty message', () => {
    cy.mount(<CatalogContent items={[]} />)
    cy.get('[data-cy="empty"]').should('exist')
    cy.get('[data-cy="table"]').should('not.exist')
  })
})
