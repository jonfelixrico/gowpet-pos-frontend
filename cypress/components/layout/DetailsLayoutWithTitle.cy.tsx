import DetailsLayoutWithTitle from '@/components/common/DetailsLayoutWithTitle'

describe('DetailsLayoutWithTitle', () => {
  it('renders the contents', () => {
    cy.mount(
      <DetailsLayoutWithTitle
        title="some title"
        href="/test/href"
        actions={<div data-cy="actions-slot" />}
      >
        <div data-cy="children-slot" />
      </DetailsLayoutWithTitle>
    )

    cy.dataCy('actions-slot').should('exist')
    cy.dataCy('children-slot').should('exist')
    cy.dataCy('title').should('have.text', 'some title')
    cy.dataCy('back').should('have.attr', 'href', '/test/href')
  })
})
