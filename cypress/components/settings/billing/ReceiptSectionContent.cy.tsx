import ReceiptSectionContent, {
  ReceiptSettingsCreate,
  ReceiptSettingsUpdate,
} from '@/app/(main)/settings/billing/receipt/ReceiptSectionContent'
import { ChakraProvider } from '@chakra-ui/react'

describe('ReceiptSectionContent', () => {
  it('shows the update section', () => {
    cy.mount(
      <ChakraProvider>
        <ReceiptSectionContent
          onClear={() => Promise.resolve()}
          onSave={() => Promise.resolve()}
          settings={{
            address: 'test',
            contactNo: 'test',
            header: 'test',
            snsLink: 'test',
            snsMessage: 'test',
          }}
        />
      </ChakraProvider>
    )

    cy.dataCy('update').should('exist')
    cy.dataCy('create').should('not.exist')
  })

  it('shows the create section', () => {
    cy.mount(
      <ChakraProvider>
        <ReceiptSectionContent
          onClear={() => Promise.resolve()}
          onSave={() => Promise.resolve()}
        />
      </ChakraProvider>
    )

    cy.dataCy('update').should('not.exist')
    cy.dataCy('create').should('exist')
  })
})

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
          onSave={() => Promise.resolve()}
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
          onSave={() => Promise.resolve()}
          onClear={() => Promise.resolve()}
        />
      </ChakraProvider>
    )

    cy.dataCy('form').should('exist')
  })
})

describe('ReceiptSettingsCreate', () => {
  it('has a set-up flow', () => {
    cy.mount(
      <ChakraProvider>
        <ReceiptSettingsCreate onSave={() => Promise.resolve()} />
      </ChakraProvider>
    )

    cy.dataCy('set-up')
      .click()
      .then(() => {
        cy.dataCy('set-up').should('not.exist')
        cy.dataCy('abort').should('exist')
        cy.dataCy('form').should('exist')
      })

    cy.dataCy('abort')
      .click()
      .then(() => {
        cy.dataCy('set-up').should('exist')
        cy.dataCy('abort').should('not.exist')
        cy.dataCy('form').should('not.exist')
      })
  })
})
