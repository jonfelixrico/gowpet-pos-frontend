import BillingListContent from '@/app/(main)/(billing)/(billing-list)/billing/BillingListContent'
import { ChakraProvider } from '@chakra-ui/react'
import MockNextRouter from '../utils/MockNextRouter'

describe('BillingListContent', () => {
  it('shows the empty message if there are no billings', () => {
    cy.mount(
      <MockNextRouter>
        <ChakraProvider>
          <BillingListContent billings={[]} />
        </ChakraProvider>
      </MockNextRouter>
    )

    cy.get('[data-cy="empty-message"]').should('exist')
    cy.get('[data-cy="content"]').should('not.exist')
  })

  it('shows the list of billings', () => {
    cy.mount(
      <MockNextRouter>
        <ChakraProvider>
          <BillingListContent
            billings={[
              {
                id: 'test billing 1',
                serialNo: 1,
                items: [
                  {
                    catalogItem: {
                      id: 'item 1',
                      name: 'item 1 name',
                    },
                    price: 150,
                    quantity: 5,
                  },
                ],
              },
              {
                id: 'test billing 2',
                serialNo: 2,
                items: [
                  {
                    catalogItem: {
                      id: 'item 2',
                      name: 'item 2 name',
                    },
                    price: 150,
                    quantity: 5,
                  },
                ],
              },
              {
                id: 'test billing 3',
                serialNo: 3,
                items: [
                  {
                    catalogItem: {
                      id: 'item 3',
                      name: 'item 3 name',
                    },
                    price: 150,
                    quantity: 5,
                  },
                ],
              },
            ]}
          />
        </ChakraProvider>
      </MockNextRouter>
    )

    cy.get('[data-cy="empty-message"]').should('not.exist')
    cy.get('[data-cy="content"]').should('exist')
    cy.get('[data-cy="billing-record"]').should('have.length', 3)
  })
})
