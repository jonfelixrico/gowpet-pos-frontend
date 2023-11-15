import BillingDetailsInfoSection from '@/app/(main)/(billing)/billing/[id]/BillingDetailsInfoSection'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingDetailsInfoSection', () => {
  it('shows the correct details', () => {
    cy.mount(
      <ChakraProvider>
        <BillingDetailsInfoSection
          billing={{
            id: 'test billing',
            items: [],
            serialNo: 313,
            notes: 'Some notes',
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="serial-no"]').should('contain.text', 313)
    cy.get('[data-cy="notes"]').should('contain.value', 'Some notes')
    cy.get('[data-cy="empty-notes"]').should('not.exist')
  })

  it('indicates if there are no notes', () => {
    cy.mount(
      <ChakraProvider>
        <BillingDetailsInfoSection
          billing={{
            id: 'test billing',
            items: [],
            serialNo: 313,
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="notes"]').should('not.exist')
    cy.get('[data-cy="empty-notes"]').should('exist')
  })
})
