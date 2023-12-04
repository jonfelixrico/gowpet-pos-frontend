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

  it('shows the qr code', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogDetailsCard
          catalogItem={{
            name: 'test name',
            price: 123.45,
            code: 'test code',
            codeType: 'CUSTOM',
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('barcode').find('[data-type="CUSTOM"]').should('exist')
    cy.dataCy('code').should('have.text', 'test code')
  })

  it('shows the barcode', () => {
    cy.mount(
      <ChakraProvider>
        <CatalogDetailsCard
          catalogItem={{
            name: 'test name',
            price: 123.45,
            code: '1234567890123',
            codeType: 'UPC',
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('barcode').find('[data-type="UPC"]').should('exist')
    cy.dataCy('code').should('have.text', '1234567890123')
  })
})
