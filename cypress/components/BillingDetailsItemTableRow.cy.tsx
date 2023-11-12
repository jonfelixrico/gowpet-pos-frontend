import { BillingDetailsItemTableRow } from '@/app/(main)/(billing)/billing/[id]/BillingDetailsItemTable'

describe('BillingDetailsItemTableRow', () => {
  it('it should show the correct data', () => {
    cy.mount(
      <BillingDetailsItemTableRow
        item={{
          catalogItem: {
            id: 'dummy',
            name: 'test name',
          },
          price: 150.5,
          quantity: 3,
        }}
      />
    )

    cy.get('[data-cy="name"]').should('have.text', 'test name')
    cy.get('[data-cy="quantity"]').should('have.text', '3')
    cy.get('[data-cy="price"]').should('have.text', '150.5')
    cy.get('[data-cy="amount"]').should('have.text', '451.5')
  })
})
