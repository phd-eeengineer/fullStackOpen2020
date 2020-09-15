describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'Test User',
            username: 'test',
            password: 'test'
        }
      
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    
    // Ex 5.17
    it('Login form is shown', function() {
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    // ex. 5.18
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('test')
          cy.get('#password').type('test')
          cy.contains('login').click()
            
          cy.contains('blogs')
          cy.contains('Test User logged-in')
          cy.contains('logout')
          cy.contains('create new blog')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.contains('login').click()

            cy.contains('Log in to application')
            cy.contains('username')
            cy.contains('password')
            cy.contains('login')
        })        
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'test', password: 'test'})
        })
        
        // Ex. 5.19
        it('A blog can be created', function() {
          cy.contains('create new blog').click()

          cy.contains('create new') // did blogform open?

          cy.get('#title').type('Test title')
          cy.get('#author').type("Test Cypress")
          cy.get('#url').type('www.cypress.com')

          cy.get('#create-button').click()

          cy.contains('Test title Test Cypress')
        })
      })

})