import BillingCatalogSearchDialogContent from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearchDialogContent'
import { CatalogItem } from '@/types/catalog/CatalogItem'
import { ChakraProvider, Modal } from '@chakra-ui/react'
import { ReactNode } from 'react'

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <Modal isOpen={true} onClose={() => {}}>
        {children}
      </Modal>
    </ChakraProvider>
  )
}

function generateDummyItems(count: number, startId = 0): CatalogItem[] {
  return Array.from({ length: count })
    .fill(null)
    .map((_, index) => {
      const id = startId + index
      return {
        id: `item ${id}`,
        name: `item ${id} name`,
        price: 150.0,
        type: 'PRODUCT',
      }
    })
}

describe('BillingCatalogSearchDialogContent', () => {
  it('shows empty message', () => {
    cy.mount(
      <Wrapper>
        <BillingCatalogSearchDialogContent />
      </Wrapper>
    )
    cy.get('[data-cy="no-items"]').should('exist')
  })

  it('does not render the show more button', () => {
    cy.mount(
      <Wrapper>
        <BillingCatalogSearchDialogContent
          initialState={{
            items: generateDummyItems(1),
            pageCount: 10,
            pageNo: 9,
            searchTerm: '',
          }}
        />
      </Wrapper>
    )

    cy.get('[data-cy="show-more"]').should('not.exist')
  })

  it('can load more', () => {
    cy.mount(
      <Wrapper>
        <BillingCatalogSearchDialogContent
          initialState={{
            items: generateDummyItems(10),
            pageCount: 10,
            pageNo: 8,
            searchTerm: '',
          }}
        />
      </Wrapper>
    )

    cy.get('[data-cy="catalog-item"]').should('have.length', 10)

    cy.intercept(
      {
        pathname: '/billing/catalog-search',
      },
      {
        body: generateDummyItems(10, 10),
        headers: {
          'X-Total-Count': '10',
        },
      }
    )

    cy.get('[data-cy="show-more"]').click()

    cy.get('[data-cy="catalog-item"]').should('have.length', 20)

    // should be at the final page at this point
    cy.get('[data-cy="show-more"]').should('not.exist')
  })

  it('can perform a search', () => {
    cy.mount(
      <Wrapper>
        <BillingCatalogSearchDialogContent
          initialState={{
            items: generateDummyItems(50),
            pageCount: 10,
            pageNo: 8,
            searchTerm: '',
          }}
        />
      </Wrapper>
    )

    cy.get('[data-cy="catalog-item"]').should('have.length', 50)

    cy.intercept(
      {
        pathname: '/billing/catalog-search',
        query: {
          pageNo: '0',
          searchTerm: 'some-keyword',
        },
      },
      {
        body: generateDummyItems(10, 500),
        headers: {
          'X-Total-Count': '10',
        },
      }
    )

    cy.get('[data-cy="search"] input').clear().type('some-keyword')
    cy.get('[data-cy="search"] button').click()

    cy.get('[data-cy="catalog-item"]').should('have.length', 10)
  })
})
