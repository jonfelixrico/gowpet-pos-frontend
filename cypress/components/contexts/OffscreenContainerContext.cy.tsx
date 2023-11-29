import {
  OffscreenContainerPortal,
  OffscreenContainerProvider,
} from '@/contexts/OffscreenContainerContext'

describe('OffscreenContainerContext', () => {
  it('renders its children', () => {
    cy.mount(
      <OffscreenContainerProvider>
        <div data-cy="child" />
      </OffscreenContainerProvider>
    )

    cy.dataCy('child').should('exist')
  })

  it('renders via portal', () => {
    cy.mount(
      <OffscreenContainerProvider>
        <OffscreenContainerPortal>
          <div data-cy="thru-portal" />
        </OffscreenContainerPortal>
      </OffscreenContainerProvider>
    )

    cy.dataCy('thru-portal').should('exist')
  })
})
