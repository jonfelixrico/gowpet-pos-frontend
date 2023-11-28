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

  it('is enabled if receiptSettings is not nullish', () => {
    cy.mount(
      <ChakraProvider>
        <BillingPrintReceiptButton
          billing={{
            id: 'random id',
            items: [],
            serialNo: 1,
          }}
          receiptSettings={{
            address: 'test address',
            contactNo: 'test contact no',
            header: 'test header',
            snsLink: 'http://test-sns',
            snsMessage: 'test sns message',
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('print-receipt').should('not.be.disabled')
  })
})
