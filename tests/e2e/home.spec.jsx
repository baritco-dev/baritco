describe('Home Page', () => {
  it('should display the homepage title', () => {
    cy.visit('/');
    cy.contains('پلتفرم باریتکو').should('be.visible');
  });

  it('should navigate to products page', () => {
    cy.visit('/');
    cy.contains('محصولات').click();
    cy.url().should('include', '/shop/products');
  });
});