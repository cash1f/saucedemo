/// <reference types="cypress"/>

describe('Checkout: Information', () => {
    beforeEach (() => {
        cy.visit('http://www.saucedemo.com/')
        cy.get('[data-test=username]')
          .type("standard_user")
        cy.get('[data-test=password]')
          .type('secret_sauce')
        cy.contains('Login').click()
        cy.get('[data-test=product_sort_container]')
          .select('hilo');
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
        cy.get('[data-test=add-to-cart-sauce-labs-onesie]').click()
        cy.get('.shopping_cart_badge').click()
        cy.get('[data-test=checkout]').click()

    })
    
    it('Checkout page', () => {
        // Checking checkout page title and basket items
        cy.get('.title').should('contain','Checkout: Your Information')
        cy.get('.shopping_cart_badge').should('contain', '2')

    })
     
    
    it('Form fields: Empty fields', () => {
        // Checking out with no details
        cy.get('[data-test=continue]').click()
        cy.get('[data-test=error]').should('contain', 'Error: First Name is required')

    })

    it('Form fields: Only First Name provided', () => {
        // Checking out with only first name
        cy.get('[data-test=firstName]').clear()
        cy.get('[data-test=firstName]').type('Standard')
        cy.get('[data-test=continue]').click()
        cy.get('[data-test=error]').should('contain', 'Error: Last Name is required')

    })

    it('Form fields: Only First Name and Last Name provided', () => {
        // Checking out with first name and last name but no postcode
        cy.get('[data-test=firstName]').clear()
        cy.get('[data-test=firstName]').type('Standard')
        cy.get('[data-test=lastName]').clear()
        cy.get('[data-test=lastName]').type('User')
        cy.get('[data-test=continue]').click()
        cy.get('[data-test=error]').should('contain', 'Error: Postal Code is required')

    })

    it('Form fields: Happy Path', () => {
        // Checking out with all the details and looking for "Checkout: Overview" label 
        cy.get('[data-test=firstName]').clear()
        cy.get('[data-test=firstName]').type('Standard')
        cy.get('[data-test=lastName]').clear()
        cy.get('[data-test=lastName]').type('User')
        cy.get('[data-test=postalCode]').clear()
        cy.get('[data-test=postalCode]').type('AB1 2CD')
        cy.get('[data-test=continue]').click()
        cy.get('.title').should('contain', 'Checkout: Overview')

    })


})