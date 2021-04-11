/// <reference types="cypress"/>

describe('Login', () => {
    beforeEach (() => {
        cy.visit('http://www.saucedemo.com/')
    })
    
    it('Login 1: Empty credentials ', () => {
        //Login with no username or password
        cy.contains('Login').click()
        cy.get('.error-message-container').should('contain','Username is required')
    })

    it('Login 2: Incorrect User, empty password', () => {
        // Login with non-existing username and empty password
        cy.get('[data-test=username]').type("standard_use")
        cy.contains('Login').click()
        cy.get('.error-message-container').should('contain','Password is required')

    })

    it('Login 3: Incorrect User, valid password', () => {
        // Login with non-existing username and correct password
        cy.get('[data-test=username]').type("standard_use")
        cy.get('[data-test=password]').type('secret_sauce')
        cy.contains('Login').click()
        cy.get('.error-message-container')
          .should('contain','Username and password do not match any user in this service')
    })

    it('Login 4: Correct User, empty password', () => {
        // Login with existing username abd empty password
        cy.get('[data-test=username]').type("standard_user")
        cy.contains('Login').click()
        cy.get('.error-message-container')
          .should('contain','Password is required')
        
    })

    it('Login 5: Correct User, invalid password', () => {
        // Login with existing username and wrong password
        cy.get('[data-test=username]').type("standard_user")
        cy.get('[data-test=password]').type("wrong_password")
        cy.contains('Login').click()
        cy.get('.error-message-container')
          .should('contain','Username and password do not match any user in this service')
        
    })    

    it('Login 5: Products Page', () => {
        // Login with correct username and password
        cy.get('[data-test=username]').type("standard_user")
        cy.get('[data-test=password]').type('secret_sauce')
        cy.contains('Login').click()

        // Checking the success message after login
        cy.get('.title').should('contain','Products')
    })
})