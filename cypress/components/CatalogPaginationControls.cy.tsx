import { CatalogPaginationControls } from '@/app/(main)/(catalog-list)/catalog/CatalogPaginationControls'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogPaginationControls', () => {
  it('should render the controls', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls pageCount={1} pageNo={1} />
      </ChakraProvider>
    )

    cy.get('[data-cy="next"]').should('exist')
    cy.get('[data-cy="first"]').should('exist')
    cy.get('[data-cy="prev"]').should('exist')
    cy.get('[data-cy="last"]').should('exist')
  })

  it('disables prev and first if on first page', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls pageCount={10} pageNo={1} />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] button').should('be.disabled')
    cy.get('[data-cy="prev"] button').should('be.disabled')

    cy.get('[data-cy="next"] button').should('not.be.disabled')
    cy.get('[data-cy="last"] button').should('not.be.disabled')
  })

  it('disables prev and first if on last page', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls pageCount={10} pageNo={10} />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] button').should('not.be.disabled')
    cy.get('[data-cy="prev"] button').should('not.be.disabled')

    cy.get('[data-cy="next"] button').should('be.disabled')
    cy.get('[data-cy="last"] button').should('be.disabled')
  })

  it('enables all buttons', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls pageCount={5} pageNo={10} />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] button').should('not.be.disabled')
    cy.get('[data-cy="prev"] button').should('not.be.disabled')

    cy.get('[data-cy="next"] button').should('not.be.disabled')
    cy.get('[data-cy="last"] button').should('not.be.disabled')
  })
})
