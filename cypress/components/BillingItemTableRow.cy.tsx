import BillingItemTableRow from '@/app/(main)/(billing)/billing/create/input/BillingItemTableRow'
import { ChakraProvider, Table } from '@chakra-ui/react'
import { ReactNode } from 'react'

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      {/* BillingItemTableRow needs to be a child of a Table component to work */}
      <Table>{children}</Table>
    </ChakraProvider>
  )
}

describe('BillingItemTableRow', () => {
  it('displays the data', () => {
    cy.mount(
      <Wrapper>
        <BillingItemTableRow
          item={{
            catalogItem: {
              id: 'id',
              name: 'foo',
              price: 125.0,
              type: 'PRODUCT',
            },
            quantity: 10,
          }}
        />
      </Wrapper>
    )

    cy.get('[data-cy="quantity"]').should('contain.text', 10)
    cy.get('[data-cy="name"]').should('contain.text', 'foo')
    cy.get('[data-cy="price"]').should('contain.text', '125')
    cy.get('[data-cy="amount"]').should('contain.text', '1250')
  })

  it('reacts to delete', () => {
    const onDeleteSpy = cy.spy()
    cy.mount(
      <Wrapper>
        <BillingItemTableRow
          onDelete={onDeleteSpy}
          item={{
            catalogItem: {
              id: 'id',
              name: 'foo',
              price: 125.0,
              type: 'PRODUCT',
            },
            quantity: 10,
          }}
        />
      </Wrapper>
    )

    cy.get('[data-cy="delete"]')
      .click()
      .then(() => {
        expect(onDeleteSpy).to.have.been.calledOnce
      })
  })
})
