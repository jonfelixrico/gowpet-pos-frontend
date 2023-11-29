import {
  OffscreenContainerPortal,
  OffscreenContainerProvider,
} from '@/contexts/OffscreenContainerContext'

describe('OffscreenContainerContext', () => {
  it('renders via portal', () => {
    cy.mount(
      <div data-cy="test-root">
        <OffscreenContainerProvider data-cy="portal">
          <div data-cy="1">
            <div data-cy="2">
              <div data-cy="3">
                <div data-cy="inner-content" />
                <OffscreenContainerPortal>
                  <div data-cy="thru-portal" />
                </OffscreenContainerPortal>
              </div>
            </div>
          </div>
        </OffscreenContainerProvider>
      </div>
    )

    cy.get(
      '[data-cy="test-root"] [data-cy="portal"] [data-cy="thru-portal"]'
    ).should('exist')
    cy.get(
      '[data-cy="1"] [data-cy="2"] [data-cy="3"] [data-cy="inner-content"]'
    ).should('exist')

    // Shouldn't be a sibling of the inner content. It should be rendered via a portal
    cy.get(
      '[data-cy="1"] [data-cy="2"] [data-cy="3"] [data-cy="thru-portal"]'
    ).should('not.exist')
  })
})
