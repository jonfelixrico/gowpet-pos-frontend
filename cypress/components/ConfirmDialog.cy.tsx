import ConfirmDialog from '@/components/common/ConfirmDialog'
import { ChakraProvider } from '@chakra-ui/react'

describe('ConfirmDialog', () => {
  it('shows defaults', () => {
    cy.mount(
      <ChakraProvider>
        <ConfirmDialog
          isOpen={true}
          onOk={() => {}}
          onCancel={() => {}}
          onDismiss={() => {}}
          title="title"
          message="message"
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="ok"]').should('contain.text', 'Ok')
    cy.get('[data-cy="cancel"]').should('contain.text', 'Cancel')
    cy.get('[data-cy="title"]').should('contain.text', 'title')
    cy.get('[data-cy="message"]').should('contain.text', 'message')
  })

  it('shows custom button labels', () => {
    cy.mount(
      <ChakraProvider>
        <ConfirmDialog
          isOpen={true}
          onOk={() => {}}
          onCancel={() => {}}
          onDismiss={() => {}}
          title="title"
          message="message"
          ok={{
            label: 'custom ok',
          }}
          cancel={{
            label: 'custom cancel',
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="ok"]').should('contain.text', 'custom ok')
    cy.get('[data-cy="cancel"]').should('contain.text', 'custom cancel')
  })
})
