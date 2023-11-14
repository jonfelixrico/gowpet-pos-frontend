import BillingItemTable from '@/app/(main)/(billing)/billing/create/input/BillingItemTable'
import { BillingItem } from '@/types/Billing'
import { ChakraProvider } from '@chakra-ui/react'

function generateDummyItems(count: number, startId = 0): BillingItem[] {
  return Array.from({ length: count })
    .fill(null)
    .map((_, index) => {
      const id = startId + index
      return {
        catalogId: `item-${id}`,
        name: `item ${id} name`,
        price: 150.0,
        quantity: 25,
      }
    })
}

describe('BillingItemTable', () => {
  it('can cancel delete', () => {
    cy.mount(
      <ChakraProvider>
        <BillingItemTable
          billing={{
            notes: '',
            items: generateDummyItems(1),
          }}
          setBilling={() => {}}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="delete"]').click()
    cy.get(
      '[data-cy="delete-confirm"][data-dialog-opened="true"] [data-cy="cancel"]'
    ).click()
    cy.get('[data-cy="delete-confirm"]').should(
      'have.attr',
      'data-dialog-opened',
      'true'
    )
  })

  it('handles delete', () => {
    const setBilling = cy.spy().as('setBilling')

    const items = generateDummyItems(10)
    cy.mount(
      <ChakraProvider>
        <BillingItemTable
          billing={{
            notes: '',
            items,
          }}
          setBilling={setBilling}
        />
      </ChakraProvider>
    )

    cy.get('[data-billing-item-id="item-5"] [data-cy="delete"]').click()

    cy.get(
      '[data-cy="delete-confirm"][data-dialog-opened="true"] [data-cy="ok"]'
    ).click()
    cy.get('[data-cy="delete-confirm"]').should(
      'have.attr',
      'data-dialog-opened',
      'true'
    )

    const clone = [...items]
    clone.splice(5, 1)

    cy.get('@setBilling').should('have.been.calledOnceWith', {
      notes: '',
      items: clone,
    })
  })
})
