import InputBillingItem from '@/components/billing/input/InputBillingItem'
import { ChakraProvider } from '@chakra-ui/react'

describe('InputBillingItem', () => {
  it('displays the data', () => {
    cy.mount(
      <ChakraProvider>
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
      </ChakraProvider>
    )

    cy.get('[data-cy="quantity"]').should('have.value', 10)
    cy.get('[data-cy="name"]').should('contain.text', 'foo')
    cy.get('[data-cy="price"]').should('contain.text', '125')
    cy.get('[data-cy="amount"]').should('contain.text', '1250')
  })

  it('reacts to delete', () => {
    const onDeleteSpy = cy.spy()
    cy.mount(
      <ChakraProvider>
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
      </ChakraProvider>
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
      <ChakraProvider>
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
      </ChakraProvider>
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
