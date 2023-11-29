import { OffscreenContainerProvider } from '@/contexts/OffscreenContainerContext'

describe('OffscreenContainerContext', () => {
  it('renders its children', () => {
    cy.mount(
      <OffscreenContainerProvider>
        <div data-cy="child" />
      </OffscreenContainerProvider>
    )

    cy.dataCy('child').should('exist')
  })
})
