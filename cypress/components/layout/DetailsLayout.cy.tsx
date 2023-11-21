import DetailsLayout from '@/components/common/DetailsLayout'

describe('DetailsLayout', () => {
  it('renders the contents', () => {
    cy.mount(
      <DetailsLayout href="/some-href" header={<div data-cy="header-slot" />}>
        <div data-cy="children-slot" />
      </DetailsLayout>
    )

    cy.dataCy('header-slot').should('exist')
    cy.dataCy('children-slot').should('exist')
    cy.dataCy('back').should('have.attr', 'href', '/some-href')
  })
})
