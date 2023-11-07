import InputBillingItem from '@/components/billing/input/InputBillingItem'

describe('InputBillingItem', () => {
  it('displays the data', () => {
    cy.mount(
      <InputBillingItem
        onDelete={() => {}}
        onQuantityChange={() => {}}
        item={{
          catalogId: 'id',
          name: 'foo',
          price: 125.0,
          quantity: 10,
        }}
      />
    )

    cy.get('[data-cy="quantity"]').should('have.value', 10)
    cy.get('[data-cy="name"]').should('contain.text', 'foo')
    cy.get('[data-cy="price"]').should('contain.text', '125')
  })
})
