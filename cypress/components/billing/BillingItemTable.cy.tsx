import BillingItemTable from '@/components/billing/create/input/BillingItemTable'
import { BillingItem } from '@/types/Billing'
import { ChakraProvider } from '@chakra-ui/react'
import { cloneDeep } from 'lodash'

function generateDummyItems(count: number, startId = 0): BillingItem[] {
  return Array.from({ length: count })
    .fill(null)
    .map((_, index) => {
      const id = startId + index
      return {
        catalogItem: {
          name: `item ${id} name`,
          price: 150.0,
          id: `item-${id}`,
          type: 'PRODUCT',
        },
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

  it('supports edit', () => {
    const setBilling = cy.spy().as('setBilling')
    const billing = {
      notes: '',
      items: generateDummyItems(10),
    }
    cy.mount(
      <ChakraProvider>
        <BillingItemTable billing={billing} setBilling={setBilling} />
      </ChakraProvider>
    )

    cy.get('[data-cy="billing-item"]:nth-child(6) [data-cy="edit"]').click()
    cy.get(
      '[data-cy="edit-dialog"][data-dialog-opened="true"] [data-cy="quantity"]'
    )
      .clear()
      .type('500')
    cy.get(
      '[data-cy="edit-dialog"][data-dialog-opened="true"] [data-cy="ok"]'
    ).click()

    const clone = cloneDeep(billing)
    clone.items[5].quantity = 500
    cy.get('@setBilling').should('have.been.calledWith', clone)
  })
})
