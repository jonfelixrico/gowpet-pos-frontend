import BillingItemQuantity from '@/app/(main)/(billing)/billing/create/input/BillingItemQuantity'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillinItemQuantity', () => {
  it('shows the quantity', () => {
    cy.mount(
      <ChakraProvider>
        <BillingItemQuantity quantity={5} />
      </ChakraProvider>
    )
    cy.get('[data-cy="quantity"]').should('have.text', 5)
  })

  it('supports increment and decrement', () => {
    const increment = cy.spy().as('increment')
    const decrement = cy.spy().as('decrement')

    cy.mount(
      <ChakraProvider>
        <BillingItemQuantity
          quantity={5}
          onDecrement={decrement}
          onIncrement={increment}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="increment"]').click()
    cy.get('[data-cy="decrement"]').click()

    cy.get('@increment').should('have.been.calledOnce')
    cy.get('@decrement').should('have.been.calledOnce')
  })

  it('does not allow decrementing if the quantity is already one', () => {
    cy.mount(
      <ChakraProvider>
        <BillingItemQuantity quantity={1} />
      </ChakraProvider>
    )

    cy.get('[data-cy="decrement"]').should('be.disabled')
  })
})
