describe('Login ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('page can be displayed', function () {
    cy.contains('Unity massage booking system')
    cy.contains('Kirjaudu')
  })

  it('is possible to login with valid user', function () {
    // CONFIRM THAT THIS USER IS ACTUALLY IN DATABASE
    const validUser = {
      email: "nou@jea.nou",
      password: "testing"
    }

    cy.get('#email').type(validUser.email)
    cy.get('#password').type(validUser.password)
    cy.contains('kirjaudu').click()
    cy.contains('Tervetuloa')
  })

  it('is NOT possible to login with empty input', function () {
    cy.contains('kirjaudu').click()
    cy.contains('Unity massage booking system')
  })
  it('is NOT possible to login with a non-existing user', function () {
    // CONFIRM THAT THIS USER IS NOT ACTUALLY IN DATABASE
    const invalidUser = {
      email: "aaaaaaaaaaaa@bbbbbbbbbbb.ccccccccccccc",
      password: "ddddddddddddeeeeeeeeeeeeeeeeffffffff"
    }

    cy.get('#email').type(invalidUser.email)
    cy.get('#password').type(invalidUser.password)
    cy.contains('kirjaudu').click()
    cy.contains('Unity massage booking system')
  })
})