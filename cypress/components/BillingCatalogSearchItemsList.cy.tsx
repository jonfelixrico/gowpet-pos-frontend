import BillingCatalogSearchItemsList from '@/app/(main)/(billing)/billing/create/search/BillingCatalogSearchItemsList'
import { ChakraProvider } from '@chakra-ui/react'

describe('BillingCatalogSearchItemsList', () => {
  it('shows the details', () => {
    cy.mount(
      <ChakraProvider>
        <BillingCatalogSearchItemsList
          itemsToSelectFrom={[
            {
              id: 'test',
              name: 'test name',
              price: 123.45,
              type: 'PRODUCT',
            },
          ]}
        />
      </ChakraProvider>
    )

    cy.get('[data-cy="name"]').should('have.text', 'test name')
    cy.get('[data-cy="price"]').should('have.text', '123.45')
  })

  it('adds to the billing items', () => {
    const setBilling = cy.spy().as('setBilling')

    cy.mount(
      <ChakraProvider>
        <BillingCatalogSearchItemsList
          itemsToSelectFrom={[
            {
              id: 'test 1',
              name: 'test name 1',
              price: 123.45,
              type: 'PRODUCT',
            },
            {
              id: 'test 2',
              name: 'test name 2',
              price: 234.56,
              type: 'PRODUCT',
            },
          ]}
          billing={{
            items: [
              {
                catalogId: 'test 1',
                name: 'test name 1',
                price: 123.45,
                quantity: 1,
              },
            ],

            notes: '',
          }}
          setBilling={setBilling}
        />
      </ChakraProvider>
    )

    cy.get('[data-catalog-item-id="test 2"] [data-cy="add"]').click()

    cy.get('@setBilling').should('have.been.calledOnceWith', {
      items: [
        {
          catalogId: 'test 1',
          name: 'test name 1',
          price: 123.45,
          quantity: 1,
        },
        {
          catalogId: 'test 2',
          name: 'test name 2',
          price: 234.56,
          quantity: 1,
        },
      ],

      notes: '',
    })
  })

  it('prevents adding already-added items', () => {
    cy.mount(
      <ChakraProvider>
        <BillingCatalogSearchItemsList
          itemsToSelectFrom={[
            {
              id: 'test 1',
              name: 'test name 1',
              price: 123.45,
              type: 'PRODUCT',
            },
            {
              id: 'test 2',
              name: 'test name 2',
              price: 234.56,
              type: 'PRODUCT',
            },
          ]}
          billing={{
            items: [
              {
                catalogId: 'test 1',
                name: 'test name 1',
                price: 123.45,
                quantity: 1,
              },
            ],

            notes: '',
          }}
        />
      </ChakraProvider>
    )

    cy.get('[data-catalog-item-id="test 1"] [data-cy="add"]').should(
      'be.disabled'
    )
    cy.get('[data-catalog-item-id="test 2"] [data-cy="add"]').should(
      'not.be.disabled'
    )
  })
})
