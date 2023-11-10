import BillingItemTableRow from '@/app/(main)/(billing)/billing/create/input/BillingItemTableRow'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingItemTableRow', () => {
  it('displays the data', () => {
    cy.mount(
      <ChakraProvider>
        <BillingItemTableRow
          item={{
            catalogId: 'id',
            name: 'foo',
            price: 125.0,
            quantity: 10,
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="quantity"]').should('contain.text', 10)
    cy.get('[data-cy="name"]').should('contain.text', 'foo')
    cy.get('[data-cy="price"]').should('contain.text', '125')
    cy.get('[data-cy="amount"]').should('contain.text', '1250')
  })

  it('reacts to delete', () => {
    const onDeleteSpy = cy.spy()
    cy.mount(
      <ChakraProvider>
        <BillingItemTableRow
          onDelete={onDeleteSpy}
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
        <BillingItemTableRow
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

  it('cannot decrement if quantity is 1', () => {
    const onChange = cy.spy()
    cy.mount(
      <ChakraProvider>
        <BillingItemTableRow
          onQuantityChange={onChange}
          item={{
            catalogId: 'id',
            name: 'foo',
            price: 125.0,
            quantity: 1,
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="decrement"]').should('be.disabled')
  })
})