describe('Register ', function () {

    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.contains('Create a new user').click()
    })
    it('Page can be displayed', function(){
     cy.contains('Register')
    })

  })