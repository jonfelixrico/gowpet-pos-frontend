import CatalogForm from '@/components/catalog/CatalogForm'

describe('CatalogForm', () => {
  it('starts cleared', () => {
    cy.mount(<CatalogForm onSubmit={() => Promise.resolve()} />)

    cy.dataCy('name').find('input').should('be.empty')
    cy.dataCy('price').find('input').should('be.empty')
    cy.dataCy('code-type').find('select').should('have.value', 'UPC')

    cy.dataCy('code').find('input').should('be.empty')
    cy.dataCy('code').should('have.attr', 'data-type', 'UPC')
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
      code: '',
      codeType: 'UPC',
    })
  })

  it('shows initial values', () => {
    cy.mount(
      <CatalogForm
        onSubmit={() => Promise.resolve()}
        initialValues={{
          name: 'test name',
          price: 1234,
          codeType: 'UPC',
          code: '123456789012',
        }}
      />
    )

    cy.dataCy('name').find('input').should('have.value', 'test name')
    cy.dataCy('price').find('input').should('have.value', 1234.0)
    cy.dataCy('code-type').find('select').should('have.value', 'UPC')
    cy.dataCy('code').find('input').should('have.value', '123456789012')
    cy.dataCy('code').should('have.attr', 'data-type', 'UPC')
  })

  it('supports code type changes', () => {
    cy.mount(<CatalogForm onSubmit={() => Promise.resolve()} />)

    // change from UPC to custom
    cy.dataCy('code-type').find('select').select('CUSTOM')
    cy.dataCy('code')
      .should('have.attr', 'data-type', 'CUSTOM')
      .find('input')
      .should('be.empty')
      .type('custom-code')

    // change from custom to UPC
    cy.dataCy('code-type').find('select').select('UPC')
    cy.dataCy('code')
      .should('have.attr', 'data-type', 'UPC')
      .find('input')
      .should('be.empty')
  })
})
