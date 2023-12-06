import BillingDetailsItemsSection from '@/components/billing/details/BillingDetailsItemsSection'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingDetailsItemsSection', () => {
  it('should show the table', () => {
    cy.mount(
      <ChakraProvider>
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
      </ChakraProvider>
    )

    cy.get('[data-cy="items-table"]').should('exist')
    cy.get('[data-cy="no-items"]').should('not.exist')
  })

  it('should show the "no items" message', () => {
    cy.mount(
      <ChakraProvider>
        <BillingDetailsItemsSection items={[]} />
      </ChakraProvider>
    )

    cy.get('[data-cy="items-table"]').should('not.exist')
    cy.get('[data-cy="no-items"]').should('exist')
  })

  it('should show the table', () => {
    cy.mount(
      <ChakraProvider>
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
      </ChakraProvider>
    )

    cy.get('[data-cy="total-amount"]').should('have.text', 484.8)
  })
})
