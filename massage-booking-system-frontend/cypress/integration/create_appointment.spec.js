describe('Appointment creation ', function() {
  // LOGIN BEFORE ACTIONS
  beforeEach(function() {
    const validUser = {
      email: 'nou@jea.nou',
      password: 'testing',
    }

    cy.visit('http://localhost:3000')
    cy.get('#email').type(validUser.email)
    cy.get('#password').type(validUser.password)
    cy.get('#login_button').click()
  })

  it('Shows navbar', function() {
    cy.contains('Index')
    cy.contains('Profile')
  })

  it('Is possible to create and cancel an appointment from existing appointments list', function() {
    cy.contains('Index').click()
    cy.contains('Available appointments')
    const firstListItem = cy.get('#appointmentsList')
    firstListItem.contains('CREATE').click()
    cy.contains('CANCEL').click()
  })
})
