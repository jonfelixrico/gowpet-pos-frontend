import ReceiptSettingsForm from '@/app/(main)/settings/billing/receipt/ReceiptSettingsForm'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { ChakraProvider } from '@chakra-ui/react'

describe('ReceiptSettingsForm', () => {
  it('supports the happy path', () => {
    const submitFn = cy.spy().as('submitFn')
    cy.mount(
      <ChakraProvider>
        <ReceiptSettingsForm onSubmit={submitFn} />
      </ChakraProvider>
    )

    cy.dataCy('header').type('Business, Inc.')
    cy.dataCy('contact-no').type('0920-123-4567')
    cy.dataCy('address').type(
      'Malacañang Complex. J.P. Laurel Street, San Miguel,. 1005 Manila City'
    )
    cy.dataCy('sns-link').type('http://facebook.com')
    cy.dataCy('sns-message').type('Follow us on Facebook!')

    cy.dataCy('submit').click()

    cy.get('@submitFn').should('have.been.calledWith', {
      address:
        'Malacañang Complex. J.P. Laurel Street, San Miguel,. 1005 Manila City',
      header: 'Business, Inc.',
      contactNo: '0920-123-4567',
      snsMessage: 'Follow us on Facebook!',
      snsLink: 'http://facebook.com',
    } as ReceiptSettings)
  })
})
