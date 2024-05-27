describe('Holiday', () => {
    beforeEach('Visits the initial project page', () => {
        cy.visit('/Holiday')
    });

    it('should submit form', () => {
        cy.get('.add-holiday-btn').click();

        cy.get('#new-holiColab').select('Manel');
        cy.get('#new-holiStart').type('2024-06-01');
        cy.get('#new-holiEnd').type('2024-06-05');

        cy.get('button[type="submit"]').click();

        cy.contains('Holiday pendent').should('be.visible');
    });
})