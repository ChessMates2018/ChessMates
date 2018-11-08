describe('Cypress run on Checked App', () => {

  it('can visit the app', () => {
    cy.visit('http://localhost:3000/#/')
  })

  it('can login', () => {
    cy.get('input:first').type('Rook')
    cy.get('input:last').type('password')
    cy.get('button').contains('Login').click()
  })

  it('can logout', () => {
    cy.get('button:first').click()
  })

  it('can register new user', () => {
    let uniqueId = 1
    cy.get('button:last').click()
  })

})