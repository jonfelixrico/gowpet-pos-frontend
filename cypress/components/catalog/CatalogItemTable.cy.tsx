import CatalogItemTable from '@/app/(main)/(catalog-list)/catalog/CatalogItemTable'
import { CatalogItem } from '@/types/catalog/CatalogItem'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogItemTable', () => {
  const ITEMS: CatalogItem[] = [
    {
      id: 'sample-1',
      name: 'sample 1 name',
      price: 1234.56,
      type: 'SERVICE',
    },
    {
      id: 'sample-2',
      name: 'sample 2 name',
      price: 789.1,
      type: 'SERVICE',
    },
  ]

  it('renders the rows', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogItemTable items={ITEMS} />
      </ChakraProvider>
    )

    cy.get('[data-cy="row"]').should('have.length', 2)

    // check 1st row
    cy.get('[data-catalog-id="sample-1"] [data-cy="name"]').contains(
      'sample 1 name'
    )
    cy.get('[data-catalog-id="sample-1"] [data-cy="price"]').contains('1234.56')
    cy.get('[data-catalog-id="sample-1"] [data-cy="show-details"]').should(
      'have.attr',
      'href',
      '/catalog/sample-1'
    )

    // check 2nd row
    cy.get('[data-catalog-id="sample-2"] [data-cy="name"]').contains(
      'sample 2 name'
    )
    cy.get('[data-catalog-id="sample-2"] [data-cy="price"]').contains('789.1')
    cy.get('[data-catalog-id="sample-2"] [data-cy="show-details"]').should(
      'have.attr',
      'href',
      '/catalog/sample-2'
    )
  })
})
