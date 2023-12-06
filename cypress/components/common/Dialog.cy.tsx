import Dialog from '@/components/common/Dialog'
import { ChakraProvider } from '@chakra-ui/react'

describe('Dialog', () => {
  it('shows defaults', () => {
    cy.mount(
      <ChakraProvider>
        <Dialog isOpen={true} header="title">
          message
        </Dialog>
      </ChakraProvider>
    )

    cy.get('[data-cy="ok"]').should('contain.text', 'Ok')
    cy.get('[data-cy="cancel"]').should('contain.text', 'Cancel')
    cy.get('[data-cy="header"]').should('contain.text', 'title')
    cy.get('[data-cy="body"]').should('contain.text', 'message')
  })

  it('shows custom button labels', () => {
    cy.mount(
      <ChakraProvider>
        <Dialog
          isOpen={true}
          header="title"
          ok={{
            content: 'custom ok',
          }}
          cancel={{
            content: 'custom cancel',
          }}
        >
          message
        </Dialog>
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
        <Dialog
          isOpen={true}
          onOk={onOk}
          onCancel={onCancel}
          header="title"
          ok={{
            content: 'custom ok',
          }}
          cancel={{
            content: 'custom cancel',
          }}
        >
          message
        </Dialog>
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
