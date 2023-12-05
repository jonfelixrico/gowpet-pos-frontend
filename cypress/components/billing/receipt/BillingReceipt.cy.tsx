import BillingReceipt from '@/components/billing/details/receipt/BillingReceipt'
import { Box, ChakraProvider } from '@chakra-ui/react'

describe('BillingReceipt', () => {
  it('contains the info', () => {
    cy.mount(
      <ChakraProvider>
        <Box border="1px" width="fit-content">
          <BillingReceipt
            width={56}
            billing={{
              id: 'test id',
              items: [
                {
                  catalogItem: {
                    id: 'item 1',
                    name: 'Piattos - Large',
                  },
                  price: 40,
                  quantity: 1,
                },
                {
                  catalogItem: {
                    id: 'item 2',
                    name: 'Miggos Nacho Cheese - Large',
                  },
                  price: 30,
                  quantity: 2,
                },
              ],
              serialNo: 55,
            }}
            settings={{
              address:
                'Malacañang Complex. J.P. Laurel Street, San Miguel,. 1005 Manila City',
              contactNo: '0920-123-4567',
              header: 'Business, Inc.',
              snsLink: 'http://facebook.com',
              snsMessage: 'Like us on Facebook!',
            }}
          />
        </Box>
      </ChakraProvider>
    )

    cy.dataCy('header').should('have.text', 'Business, Inc.')
    cy.dataCy('contact-no').should('have.text', '0920-123-4567')
    cy.dataCy('address').should(
      'have.text',
      'Malacañang Complex. J.P. Laurel Street, San Miguel,. 1005 Manila City'
    )

    cy.dataCy('sns-message').should('have.text', 'Like us on Facebook!')
    cy.dataCy('sns-qr').should('exist')

    cy.dataCy('billing-item').should('have.length', 2)

    /*
     * No need to test for all items. Testing one item is enough to assure us that the
     * stuf are being shown.
     */
    cy.get('[data-cy="billing-item"]:nth-child(2) [data-cy="name"]').should(
      'have.text',
      'Miggos Nacho Cheese - Large'
    )
    cy.get('[data-cy="billing-item"]:nth-child(2) [data-cy="price"]').should(
      'have.text',
      30
    )
    cy.get('[data-cy="billing-item"]:nth-child(2) [data-cy="quantity"]').should(
      'have.text',
      2
    )
    cy.get('[data-cy="billing-item"]:nth-child(2) [data-cy="amount"]').should(
      'have.text',
      60
    )

    cy.dataCy('total-amount').should('have.text', 100)
    cy.dataCy('total-quantity').should('have.text', 3)
    cy.dataCy('serial').then((el) => {
      cy.wrap(el.text()).should('match', /^0+55$/)
    })
  })
})
