import BillingCatalogSearchDialogContent from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearchDialogContent'
import { ChakraProvider, Modal } from '@chakra-ui/react'
import { ReactNode } from 'react'

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <Modal isOpen={true} onClose={() => {}}>
        {children}
      </Modal>
    </ChakraProvider>
  )
}

describe('BillingCatalogSearchDialogContent', () => {
  it('shows empty message', () => {
    cy.mount(
      <Wrapper>
        <BillingCatalogSearchDialogContent />
      </Wrapper>
    )
    cy.get('[data-cy="no-items"]').should('exist')
  })
})
