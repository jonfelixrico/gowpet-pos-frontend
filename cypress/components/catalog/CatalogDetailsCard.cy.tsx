import CatalogDetailsCard from '@/app/(main)/catalog/[catalogId]/CatalogDetailsCard'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogDetailsCard', () => {
  it('shows the basic details', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogDetailsCard
          catalogItem={{
            name: 'test name',
            price: 123.45,
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('name').should('have.text', 'test name')
    cy.dataCy('price').should('have.text', '123.45')
  })
})
