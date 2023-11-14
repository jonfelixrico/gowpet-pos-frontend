import BillingCatalogSearchItemsList from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearchItemsList'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingCatalogSearchItemsList', () => {
  it('shows the details', () => {
    cy.mount(
      <ChakraProvider>
        <BillingCatalogSearchItemsList
          itemsToSelectFrom={[
            {
              id: 'test',
              name: 'test name',
              price: 123.45,
              type: 'PRODUCT',
            },
          ]}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="name"]').should('have.text', 'test name')
    cy.get('[data-cy="price"]').should('have.text', '123.45')
  })
})
