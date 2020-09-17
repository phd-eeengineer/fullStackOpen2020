const { checkPropTypes } = require("prop-types")

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

        // Ex. 5.20
        describe.only('and a blog exists', function () {
          beforeEach(function () {
            cy.createBlog({ title: 'Test title', author: 'Test Cypress', url: 'www.cypress.com' })
          })
          
          it('A blog can be liked', function() {           
            cy.root().find('.renderBlog').get('#view-button').click()
            cy.root().find('.blogLikes').contains('0')
            cy.root().find('.blogLikes').get('#like-button').click()
            cy.root().find('.blogLikes').contains('1')
          })

          describe.only('many blogs exist', function () {
            beforeEach(function () {
              const user2 = {
                name: 'Test User 2',
                username: 'test2',
                password: 'test2'
              }          
              cy.request('POST', 'http://localhost:3001/api/users/', user2)

              const user3 = {
                name: 'Test User 3',
                username: 'test3',
                password: 'test3'
              }          
              cy.request('POST', 'http://localhost:3001/api/users/', user3)

              cy.createBlog({ title: 'blog title 1', author: 'user 1', url: 'www.first-user.com' })
              cy.login({ username: 'test2', password: 'test2'})
              cy.createBlog({ title: 'blog title 2', author: 'user 2', url: 'www.second-user.com' })
              cy.login({ username: 'test3', password: 'test3'})
              cy.createBlog({ title: 'blog title 3', author: 'user 3', url: 'www.third-user.com' })
            })
            
            // Ex 5.21
            it('the user who created a blog can delete it', function() {           
              cy.root().find('.renderBlog').last().find('#view-button').click()
              cy.root().find('.renderBlog').last().get('#remove-button').click()
              cy.root().find('.renderBlog').last().contains('blog title 3').should('not.exist')
            })

            it('the user can not delete the others blog', function() {           
              cy.root().find('.renderBlog').first().find('#view-button').click()
              cy.root().find('.renderBlog').first().find('#remove-button').should('not.exist')
            })
          })
        })

        
      })

})