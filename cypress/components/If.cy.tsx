import If from '@/components/common/If'

describe('If', () => {
  it('should render', () => {
    cy.mount(
      <If condition={true}>
        <div data-cy="content" />
      </If>
    )

    cy.get('[data-cy="content"]').should('exist')
  })

  it('should not render', () => {
    cy.mount(
      <If condition={false}>
        <div data-cy="content" />
      </If>
    )

    cy.get('[data-cy="content"]').should('not.exist')
  })
})
