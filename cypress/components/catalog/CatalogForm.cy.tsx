import CatalogForm, {
  CatalogFormFields,
} from '@/components/catalog/CatalogForm'

describe('CatalogForm', () => {
  it('starts cleared', () => {
    cy.mount(<CatalogForm onSubmit={() => Promise.resolve()} />)

    cy.dataCy('name').find('input').should('be.empty')
    cy.dataCy('price').find('input').should('be.empty')
  })

  it('supports the happy path', () => {
    const submitSpy = cy.spy().as('submit')
    cy.mount(<CatalogForm onSubmit={submitSpy} />)

    cy.dataCy('name').find('input').type('test name')
    cy.dataCy('price').find('input').type('12345')

    cy.dataCy('submit').click()

    cy.get('@submit').should('have.been.calledWith', {
      name: 'test name',
      price: '12345.00',
    })
  })

  it('shows initial values', () => {
    cy.mount(
      <CatalogForm
        onSubmit={() => Promise.resolve()}
        initialValues={{
          name: 'test name',
          price: 1234,
        }}
      />
    )

    cy.dataCy('name').find('input').should('have.value', 'test name')
    cy.dataCy('price').find('input').should('have.value', 1234.0)
  })
})
