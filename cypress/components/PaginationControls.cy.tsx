import { PaginationControls } from '@/components/pagination/PaginationControls'
import { ChakraProvider } from '@chakra-ui/react'

describe('PaginationControls', () => {
  it('renders the controls', () => {
    cy.mount(
      <ChakraProvider>
        <PaginationControls
          pageCount={1}
          pageNo={1}
          hrefBuilder={() => '/test'}
        />
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
        <PaginationControls
          pageCount={10}
          pageNo={1}
          hrefBuilder={() => '/test'}
        />
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
        <PaginationControls
          pageCount={10}
          pageNo={10}
          hrefBuilder={() => '/test'}
        />
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
        <PaginationControls
          pageCount={5}
          pageNo={10}
          hrefBuilder={() => '/test'}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] button').should('not.be.disabled')
    cy.get('[data-cy="prev"] button').should('not.be.disabled')

    cy.get('[data-cy="next"] button').should('not.be.disabled')
    cy.get('[data-cy="last"] button').should('not.be.disabled')
  })

  it('links to the correct urls', () => {
    cy.mount(
      <ChakraProvider>
        <PaginationControls
          pageCount={10}
          pageNo={5}
          hrefBuilder={(pageNo: number) => ({
            pathname: '/test',
            query: {
              pageNo,
            },
          })}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] a').should('have.attr', 'href', '/test?pageNo=1')
    cy.get('[data-cy="prev"] a').should('have.attr', 'href', '/test?pageNo=4')
    cy.get('[data-cy="next"] a').should('have.attr', 'href', '/test?pageNo=6')
    cy.get('[data-cy="last"] a').should('have.attr', 'href', '/test?pageNo=10')
  })
})
