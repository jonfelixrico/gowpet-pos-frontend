import { CatalogPaginationControls } from '@/components/catalog/list/CatalogPaginationControls'
import { ChakraProvider } from '@chakra-ui/react'

describe('CatalogPaginationControls', () => {
  it('links to the correct urls', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls pageCount={10} pageNo={5} />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] a').should(
      'have.attr',
      'href',
      '/catalog?pageNo=1'
    )
    cy.get('[data-cy="prev"] a').should(
      'have.attr',
      'href',
      '/catalog?pageNo=4'
    )
    cy.get('[data-cy="next"] a').should(
      'have.attr',
      'href',
      '/catalog?pageNo=6'
    )
    cy.get('[data-cy="last"] a').should(
      'have.attr',
      'href',
      '/catalog?pageNo=10'
    )
  })

  it('links to the correct urls (with additional query params)', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogPaginationControls
          pageCount={10}
          pageNo={5}
          additionalQuery={{
            searchTerm: 'test',
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="first"] a').should((a) => {
      const href = a.attr('href')
      expect(href).to.contain('/catalog')
      expect(href).to.contain('pageNo=1')
      expect(href).to.contain('searchTerm=test')
    })

    cy.get('[data-cy="prev"] a').should((a) => {
      const href = a.attr('href')
      expect(href).to.contain('/catalog')
      expect(href).to.contain('pageNo=4')
      expect(href).to.contain('searchTerm=test')
    })

    cy.get('[data-cy="next"] a').should((a) => {
      const href = a.attr('href')
      expect(href).to.contain('/catalog')
      expect(href).to.contain('pageNo=6')
      expect(href).to.contain('searchTerm=test')
    })

    cy.get('[data-cy="last"] a').should((a) => {
      const href = a.attr('href')
      expect(href).to.contain('/catalog')
      expect(href).to.contain('pageNo=10')
      expect(href).to.contain('searchTerm=test')
    })
  })
})
