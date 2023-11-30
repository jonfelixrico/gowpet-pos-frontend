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
            address: 'test',
            contactNo: 'test',
            header: 'test',
            snsLink: 'test',
            snsMessage: 'test',
          }}
          onSave={EMPTY_FN}
          onClear={clearFn}
        />
      </ChakraProvider>
    )

    cy.dataCy('clear').click()
    cy.get('@clearFn').should('have.been.called')
  })

  it('shows the form', () => {
    cy.mount(
      <ChakraProvider>
        <ReceiptSettingsUpdate
          settings={{
            address: 'test',
            contactNo: 'test',
            header: 'test',
            snsLink: 'test',
            snsMessage: 'test',
          }}
          onSave={EMPTY_FN}
          onClear={() => Promise.resolve()}
        />
      </ChakraProvider>
    )

    cy.dataCy('form').should('exist')
  })
})

describe('ReceiptSettingsCreate', () => {})
