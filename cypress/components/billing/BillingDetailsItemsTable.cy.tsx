import BillingDetailsItemsTable from '@/components/billing/details/BillingDetailsItemsTable'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingDetailsItemsTable', () => {
  it('it should show the correct data', () => {
    cy.mount(
      <ChakraProvider>
        <BillingDetailsItemsTable
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

    cy.get('[data-cy="row"]').should('have.length', 1)
    const row = cy.get('[data-cy="row"]').first()

    row.get('[data-cy="name"]').should('have.text', 'test name')
    row.get('[data-cy="quantity"]').should('have.text', '3')
    row.get('[data-cy="price"]').should('have.text', '150.5')
    row.get('[data-cy="amount"]').should('have.text', '451.5')
  })
})
