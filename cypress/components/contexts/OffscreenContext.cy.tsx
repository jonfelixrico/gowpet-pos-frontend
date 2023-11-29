import { OffscreenContainerProvider } from '@/contexts/OffscreenContext'

describe('OffscreenContext', () => {
  it('renders its children', () => {
    cy.mount(
      <OffscreenContainerProvider>
        <div data-cy="child" />
      </OffscreenContainerProvider>
    )

    cy.dataCy('child').should('exist')
  })
})
