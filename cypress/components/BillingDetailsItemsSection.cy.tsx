import BillingDetailsItemsSection from '@/app/(main)/(billing)/billing/[id]/BillingDetailsItemsSection'

describe('BillingDetailsItemsSection', () => {
  it('should show the table', () => {
    cy.mount(
      <BillingDetailsItemsSection
        items={[
          {
            catalogItem: {
              id: 'dummy',
              name: 'test name',
            },
            price: 150.5,
            quantity: 3,
          },
        ]}
      />
    )

    cy.get('[data-cy="items-table"]').should('exist')
    cy.get('[data-cy="no-items"]').should('not.exist')
  })

  it('should show the "no items" message', () => {
    cy.mount(<BillingDetailsItemsSection items={[]} />)

    cy.get('[data-cy="items-table"]').should('not.exist')
    cy.get('[data-cy="no-items"]').should('exist')
  })

  it('should show the table', () => {
    cy.mount(
      <BillingDetailsItemsSection
        items={[
          {
            catalogItem: {
              id: 'dummy',
              name: 'test name',
            },
            price: 150.5,
            quantity: 3,
          },

          {
            catalogItem: {
              id: 'dummy 2',
              name: 'test name 2',
            },
            price: 33.3,
            quantity: 1,
          },
        ]}
      />
    )

    cy.get('[data-cy="amount"]').should('have.text', 484.8)
  })
})
