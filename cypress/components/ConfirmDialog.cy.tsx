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
        >
          message
        </ConfirmDialog>
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
          ok={{
            content: 'custom ok',
          }}
          cancel={{
            content: 'custom cancel',
          }}
        >
          message
        </ConfirmDialog>
      </ChakraProvider>
    )

    cy.get('[data-cy="ok"]').should('contain.text', 'custom ok')
    cy.get('[data-cy="cancel"]').should('contain.text', 'custom cancel')
  })

  it('shows custom button labels', () => {
    const onOk = cy.spy()
    const onCancel = cy.spy()

    cy.mount(
      <ChakraProvider>
        <ConfirmDialog
          isOpen={true}
          onOk={onOk}
          onCancel={onCancel}
          onDismiss={() => {}}
          title="title"
          ok={{
            content: 'custom ok',
          }}
          cancel={{
            content: 'custom cancel',
          }}
        >
          message
        </ConfirmDialog>
      </ChakraProvider>
    )

    cy.get('[data-cy="ok"]')
      .click()
      .should(() => {
        expect(onOk).to.have.been.calledOnce
      })

    cy.get('[data-cy="cancel"]')
      .click()
      .should(() => {
        expect(onCancel).to.have.been.calledOnce
      })
  })
})
