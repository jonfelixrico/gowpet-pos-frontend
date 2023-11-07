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

  it('reacts to delete', () => {
    const onDeleteSpy = cy.spy()
    cy.mount(
      <InputBillingItem
        onDelete={onDeleteSpy}
        onQuantityChange={() => {}}
        item={{
          catalogId: 'id',
          name: 'foo',
          price: 125.0,
          quantity: 10,
        }}
      />
    )

    cy.get('[data-cy="delete"]')
      .click()
      .then(() => {
        expect(onDeleteSpy).to.have.been.calledOnce
      })
  })

  it('can adjust quantity', () => {
    const onChange = cy.spy()
    cy.mount(
      <InputBillingItem
        onDelete={() => {}}
        onQuantityChange={onChange}
        item={{
          catalogId: 'id',
          name: 'foo',
          price: 125.0,
          quantity: 10,
        }}
      />
    )

    // TODO test typing into the input

    cy.get('[data-cy="increment"]')
      .click()
      .then(() => {
        expect(onChange).to.have.been.calledWith(11)
      })

    cy.get('[data-cy="decrement"]')
      .click()
      .then(() => {
        expect(onChange).to.have.been.calledWith(9)
      })
  })
})
