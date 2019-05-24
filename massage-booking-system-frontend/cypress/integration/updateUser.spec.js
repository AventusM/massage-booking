describe('updateUser ', function () {

    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })
  
    it('logged in user can see link to userpage', function() {
      // CONFIRM THAT THIS USER IS ACTUALLY IN DATABASE
      const validUser = {
        email: "nou@jea.nou",
        password: "testing"
      }

      cy.get('#email').type(validUser.email)
      cy.get('#password').type(validUser.password)
      cy.contains('log in').click()
      cy.contains('Logout') // change this to name of validUser
    })
  })