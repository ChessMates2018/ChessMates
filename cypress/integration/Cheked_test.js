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
    let uniqueNum = 17
    cy.get('button').contains('Register').click()
    cy.get('input').eq(0).type('Greggor')
    cy.get('input').eq(1).type('Hammerstein')
    cy.get('input').eq(2).type('fake@fake.com')
    cy.get('input').eq(3).type('The_Hammer' + uniqueNum)
    cy.get('input').eq(4).type('superSecretPassword')
    cy.get('input').eq(5).type('superSecretPassword')
    cy.get('button').contains('Create Account').click()
    uniqueNum++
  })

  it('can logout', () => {
    cy.get('button:first').click()
  })

  // it('can choose image', () => {
  //   cy.get('button').contains('Choose Image').click()
  // })

})