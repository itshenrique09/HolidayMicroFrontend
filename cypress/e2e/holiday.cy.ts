describe('Holiday', () => {
  beforeEach('Visits the initial project page', () => {
    cy.visit('/Holiday')
  });

  it('toggle add holiday form pop-up', () => {
    cy.get('.add-holiday-btn').click();
    cy.get('.add-holiday-form').should('exist');

    cy.get('.close').click();
    cy.get('.add-holiday-form').should('not.exist');
  });

  it('should submit form', () => {
    let initialRowCount = 0;
    cy.get('table tbody tr').then(($rows) => {
      initialRowCount = $rows.length;
    })

    cy.get('.add-holiday-btn').click();

    cy.get('#new-holiColab').select('Manel');
    cy.get('#new-holiStart').type('2024-06-01');
    cy.get('#new-holiEnd').type('2024-06-05');

    cy.get('button[type="submit"]').click();

    cy.contains('Holiday pendent').should('be.visible');

    cy.get('table tbody tr').should('have.length', initialRowCount + 1);
  });

  it('should go to holidays in period', () => {
    cy.get('table tbody tr').then(() => {
      cy.contains('Férias em Período').click();

      cy.url().should('include', '/Holiday/holidays-in-period');
    });
  });

  it('should go to colabs with more than x days', () => {
    cy.get('input[type="number"]').type('1');

    cy.contains('Procurar Colaboradores').click();

    cy.url().should('include', '/Holiday/colaborator');
  });
})


// describe('Holiday', () => {
//   beforeEach('Visits the initial project page', () => {
//     cy.visit('/')
//   });

//   it('show holidays', () => { 
//     let initialRowCount = 0;
//     let name;
  
//     cy.get('.colaborator-item').then(($rows) => {
//       initialRowCount = $rows.length;
  
//       cy.get('.colaborator-name').first().invoke('text').then((text) => {
//         name = text;
  
//         cy.get('.buttonHoliday').first().click();
  
//         cy.get('h2').should('have.text', name);       
//       });
//     });
//   });
  

//   it('should add an holiday', () => {
//     cy.get('.buttonHoliday').first().click();

//     let initialRowCount = 0;
//     cy.get('.holidays tbody tr').then(($rows) => {
//       initialRowCount = $rows.length;

//       cy.get('.add-holiday-btn').click();
  
//       cy.get('#new-holiColab').select('Manel');
//       cy.get('#new-holiStart').type('2023-06-01');
//       cy.get('#new-holiEnd').type('2023-06-05');
  
//       cy.get('button[type="submit"]').click();
  
//       cy.contains('Holiday pendent').should('be.visible');
  
//       cy.get('.holidays tbody tr').should('have.length', initialRowCount + 1);
//     })
//   });
// })

