import BillingListItem from '@/app/(main)/(billing)/(billing-list)/billing/BillingListItem'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingListItem', () => {
  it('should show essential fields', () => {
    cy.mount(
      <ChakraProvider>
        <BillingListItem
          billing={{
            serialNo: 999,
            id: 'test',
            items: [
              {
                catalogItem: {
                  id: 'item 1',
                  name: 'item 1 name',
                },
                price: 150,
                quantity: 1,
              },
              {
                catalogItem: {
                  id: 'item 2',
                  name: 'item 2 name',
                },
                price: 25,
                quantity: 2,
              },
            ],
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="total-quantity"]').should('contain.text', 3)
    cy.get('[data-cy="total-amount"]').should('contain.text', 200)
    cy.get('[data-cy="serial-no"]').should('contain.text', 999)

    cy.get('[data-cy="open-details"]')
      .should('exist')
      .should('have.attr', 'href', '/billing/test')

    cy.get('[data-cy="notes"]').should('not.exist')
  })

  it('should show notes', () => {
    cy.mount(
      <ChakraProvider>
        <BillingListItem
          billing={{
            id: 'test',
            serialNo: 999,
            items: [
              {
                catalogItem: {
                  id: 'item 1',
                  name: 'item 1 name',
                },
                price: 150,
                quantity: 1,
              },
              {
                catalogItem: {
                  id: 'item 2',
                  name: 'item 2 name',
                },
                price: 25,
                quantity: 2,
              },
            ],
            notes: 'test notes',
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="notes"]').should('have.text', 'test notes')
  })
})
