/// <reference types="cypress"/>

describe('Basket', () => {
    beforeEach (() => {
        cy.visit('http://www.saucedemo.com/')
        cy.get('[data-test=username]')
          .type("standard_user")
        cy.get('[data-test=password]')
          .type('secret_sauce')
        cy.contains('Login').click()

    })
    
    it('Products page', () => {
        // Checking the Products page label
        cy.get('.title').should('contain','Products')
    })
    
    it('Sort the products by price and add the products', () => {
        // Hardcoded at the moment.. ideally it should be programmitically saved and selected 
        cy.get('[data-test=product_sort_container]').select('hilo')
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
        cy.get('[data-test=add-to-cart-sauce-labs-onesie]').click()

        // Shopping cart should have previously added 2 items
        cy.get('.shopping_cart_badge')
          .should('contain', '2')

        // Reseting app state and logout
        cy.get('#react-burger-menu-btn').click()
        cy.get('#reset_sidebar_link').click()
        cy.get('#logout_sidebar_link').click()
        
    })
    
    
    it('Open the basket', () => {
        // Checking basket items
        cy.get('[data-test=product_sort_container]').select('hilo');
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
        cy.get('[data-test=add-to-cart-sauce-labs-onesie]').click();
        cy.get('.shopping_cart_link').click();

        // Checking the hardcoded 2nd costliest product exists in cart 
        cy.get(':nth-child(3) > .cart_quantity')
          .should('contain', '1');
        cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price')
          .should('contain','$29.99');
        
        // Checking the hardcoded cheapest product exists in cart
        cy.get(':nth-child(4) > .cart_quantity')
          .should('contain', '1');
        cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price')
          .should('contain','$7.99');

    })
    

})