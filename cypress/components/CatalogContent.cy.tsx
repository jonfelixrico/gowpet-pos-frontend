import CatalogContent from '@/app/(main)/catalog/CatalogContent'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogContenet', () => {
  it('shows the empty message', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogContent items={[]} />
      </ChakraProvider>
    )

    cy.get('[data-cy="empty"]').should('exist')
    cy.get('[data-cy="table"]').should('not.exist')
  })
})
