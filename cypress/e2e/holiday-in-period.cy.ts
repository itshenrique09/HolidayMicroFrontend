describe('Holiday', () => {
  beforeEach('Visits the initial project page', () => {
    cy.visit('/Holiday/holidays-in-period/2')
  });

  it('should display colab name', () => {
    cy.get('h2').should('have.text', 'Manel');
  });

  it('cancel button should go back', () => {
    cy.contains('Cancelar').click();

    cy.location('pathname').should('eq', '/Holiday');
  });

  it('should display 1 holiday period when submiting form', () => {
    cy.get('table').should('not.exist');

    cy.get('#new-holiStart').type('2024-06-01');
    cy.get('#new-holiEnd').type('2024-06-05');

    cy.contains('Procurar').click();

    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });
})