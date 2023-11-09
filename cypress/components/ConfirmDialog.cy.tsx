import ConfirmDialog from '@/components/common/ConfirmDialog'

describe('ConfirmDialog', () => {
  it('shows defaults', () => {
    cy.mount(
      <ConfirmDialog
        isOpen={true}
        onOk={() => {}}
        onCancel={() => {}}
        onDismiss={() => {}}
        title="title"
        message="message"
      />
    )

    cy.get('[data-cy="ok"]').should('contain.text', 'Ok')
    cy.get('[data-cy="cancel"]').should('contain.text', 'Cancel')
    cy.get('[data-cy="title"]').should('contain.text', 'title')
    cy.get('[data-cy="message"]').should('contain.text', 'message')
  })
})
