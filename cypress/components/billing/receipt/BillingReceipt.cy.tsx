import BillingReceipt from '@/app/(main)/(billing)/billing/[id]/receipt/BillingReceipt'
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
  })
})
