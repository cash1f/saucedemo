/// <reference types="cypress"/>

describe('Checkout: Overview', () => {
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
        cy.get('[data-test=firstName]').clear()
        cy.get('[data-test=firstName]')
          .type('Standard')
        cy.get('[data-test=lastName]').clear()
        cy.get('[data-test=lastName]')
          .type('User')
        cy.get('[data-test=postalCode]').clear()
        cy.get('[data-test=postalCode]')
          .type('AB1 2CD')
        cy.get('[data-test=continue]').click()

    })
    

    it('Checkout Overview: Items, Payment & Shipping Information', () => {
        // Checking the basket item count
        cy.get('.shopping_cart_badge')
          .should('contain', '2')
        
        // Checking the 2nd costliest product's quantity and price
        // Hardcoded at the moment.. ideally it should be programmitically saved and selected
        cy.get(':nth-child(3) > .cart_quantity')
          .should('contain', '1')
        cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price')
          .should('contain','$29.99')
        
        // Checking the cheapest product's quantity and price
        // Hardcoded at the moment.. ideally it should be programmitically saved and selected
        cy.get(':nth-child(4) > .cart_quantity')
          .should('contain', '1')
        cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price')
          .should('contain','$7.99')
        
        // Checking for any payment method related logic.
        // At the moment only looking for generic message
        cy.get('.summary_info > :nth-child(2)')
          .should('contain', 'SauceCard #31337')
        
        // Checking for delivery method related logic
        cy.get('.summary_info > :nth-child(4)')
          .should('contain','FREE PONY EXPRESS DELIVERY!')
        
        // Checking for the subtotal
        // Hardcoded at the moment.. It should be programmitcally saved and retrieved, 
        // and here we should be adding the prices of items in the card
        cy.get('.summary_subtotal_label')
          .should('contain','37.98')

        // To do:
        // To find the actual tax percentage (which looks like 8% if $37.98)
        // Calculate it and check the Total = Item total + Tax

    })

    it('Checkout Overview: Finish', () => {
        cy.get('[data-test=finish]').click()
        
        // Checking the finish purchase message
        cy.get('.title')
          .should('contain','Checkout: Complete!')
        cy.get('.complete-header')
          .should('contain','THANK YOU FOR YOUR ORDER')
    })

   
       
    
    
    
    


})