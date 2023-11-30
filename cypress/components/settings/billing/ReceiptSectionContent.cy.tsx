import { ReceiptSettingsUpdate } from '@/app/(main)/settings/billing/receipt/ReceiptSectionContent'
import { EMPTY_FN } from '@/utils/misc-utills'
import { ChakraProvider } from '@chakra-ui/react'

describe('ReceiptSectionContent', () => {})

describe('ReceiptSettingsUpdate', () => {
  it('clears the content', () => {
    const clearFn = cy.spy().as('clearFn')

    cy.mount(
      <ChakraProvider>
        <ReceiptSettingsUpdate
          settings={{
            address: '',
            contactNo: '',
            header: '',
            snsLink: '',
            snsMessage: '',
          }}
          onSave={EMPTY_FN}
          onClear={clearFn}
        />
      </ChakraProvider>
    )

    cy.dataCy('clear').click()
    cy.get('@clearFn').should('have.been.called')
  })
})

describe('ReceiptSettingsCreate', () => {})
