import BillingListItem from '@/app/(main)/(billing)/(billing-list)/billing/BillingListItem'

describe('BillingListItem', () => {
  it('should show essential fields', () => {
    cy.mount(
      <BillingListItem
        billing={{
          id: 'test',
          items: [
            {
              catalogItem: {
                id: 'item 1',
                name: 'item 1 name',
              },
              price: 150,
              quantity: 1,
            },
            {
              catalogItem: {
                id: 'item 2',
                name: 'item 2 name',
              },
              price: 25,
              quantity: 2,
            },
          ],
        }}
      />
    )

    cy.get('[data-cy="total-quantity"]').should('contain.text', 3)
    cy.get('[data-cy="total-amount"]').should('contain.text', 200)

    cy.get('[data-cy="open"]')
      .should('exist')
      .should('have.attr', 'href', '/billing/test')
  })
})
