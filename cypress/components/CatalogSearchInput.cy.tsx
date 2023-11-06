import CatalogSearchInput from '@/app/(main)/(catalog-list)/catalog/@toolbar/CatalogSearchInput'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogSearchInput', () => {
  it('should pre-fill the input', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogSearchInput initialValue={'test value'} />
      </ChakraProvider>
    )

    cy.get('[data-cy="search-input"] input').should('have.value', 'test value')
  })

  it('should have a blank input', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogSearchInput />
      </ChakraProvider>
    )

    cy.get('[data-cy="search-input"] input').should('be.empty')
  })

  it('should generate the href on input change', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogSearchInput />
      </ChakraProvider>
    )

    cy.get('[data-cy="search-input"] input').type('search test')
    cy.get('[data-cy="search-input"] a[href*="searchTerm=search+test"]').should(
      'exist'
    )

    cy.get('[data-cy="search-input"] input').clear().type('search test 123')
    cy.get(
      '[data-cy="search-input"] a[href*="searchTerm=search+test+123"]'
    ).should('exist')
  })
})
