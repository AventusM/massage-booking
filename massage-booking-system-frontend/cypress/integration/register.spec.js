describe('Register ', function () {

    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.contains('Create a new user').click()
    })

    it('Page can be displayed', function(){
     cy.contains('Register')
    })

    it('Should be possible to register with a new user', function(){
    const newUser = {
        name: 'Test User123',
        email: 'testuser@unity3d.com',
        number: '0409876543',
        password: 'TestPassword'   
        }

        cy.get('#name').type(newUser.name)
        cy.get('#email').type(newUser.email)
        cy.get('#number').type(newUser.number)
        cy.get('#password').type(newUser.password)
        cy.get('#passwordCheck').type(newUser.password)

        cy.contains('Register').click()
        cy.contains('Welcome')
    })

    it('Should be possible to register without a phone number', function(){
        const newUser = {
            name: 'Test User123',
            email: 'testuser@unity3d.com',
            number: '0409876543',
            password: 'TestPassword'   
            }
  
            cy.get('#name').type(newUser.name)
            cy.get('#email').type(newUser.email)
            cy.get('#password').type(newUser.password)
            cy.get('#passwordCheck').type(newUser.password)

            cy.contains('Register').click()
            cy.contains('Welcome')
    })
    
    it('Shouldnt be possible to register without password confirmation', function(){
        const newUser = {
            name: 'Test User123',
            email: 'testuser@unity3d.com',
            number: '0409876543',
            password: 'TestPassword'   
            }
  
            cy.get('#name').type(newUser.name)
            cy.get('#email').type(newUser.email)
            cy.get('#password').type(newUser.password)

            cy.contains('Register').click()
            cy.contains('Register')
    })


  })
