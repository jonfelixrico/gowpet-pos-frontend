import BillingPrintReceiptButton from '@/app/(main)/(billing)/billing/[id]/BillingPrintReceiptButton'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingPrintReceiptButton', () => {
  it('is disabled if receiptSettings is nullish', () => {
    cy.mount(
      <ChakraProvider>
        <BillingPrintReceiptButton
          billing={{
            id: 'random id',
            items: [],
            serialNo: 1,
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('print-receipt').should('be.disabled')
  })
})
