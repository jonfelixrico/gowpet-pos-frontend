import CreateRootUserForm from '@/components/user/CreateRootUserForm'

describe('CreateRootUserForm', () => {
  it('prevents incomplete input from submitting', () => {
    const onSubmit = cy.spy().as('submit')
    cy.mount(<CreateRootUserForm onSubmit={onSubmit} />)

    cy.dataCy('username').type('username')
    cy.dataCy('submit').click()
    cy.get('@submit').should('not.have.been.called')
    cy.dataCy('username').clear()

    cy.dataCy('password').type('password')
    cy.dataCy('submit').click()
    cy.get('@submit').should('not.have.been.called')
    cy.dataCy('password').clear()

    cy.dataCy('confirm-password').type('password')
    cy.dataCy('submit').click()
    cy.get('@submit').should('not.have.been.called')
    cy.dataCy('confirm-password').clear()
  })

  it('it prevents mismatched passwords from submitting', () => {
    const onSubmit = cy.spy().as('submit')
    cy.mount(<CreateRootUserForm onSubmit={onSubmit} />)

    cy.dataCy('username').type('username')
    cy.dataCy('password').type('password')
    cy.dataCy('confirm-password').type('mismatch password')
    cy.dataCy('submit').click()

    cy.get('@submit').should('not.have.been.called')
  })

  it('submits if input is correct', () => {
    const onSubmit = cy.spy().as('submit')
    cy.mount(<CreateRootUserForm onSubmit={onSubmit} />)

    cy.dataCy('username').type('username')
    cy.dataCy('password').type('password')
    cy.dataCy('confirm-password').type('password')
    cy.dataCy('submit').click()

    cy.get('@submit').should('have.been.called')
  })
})
