
describe('Create Team', () => {
  it('Crear un equipo satisfactoriamente', () => {
    cy.visit('http://localhost:3000/teams');
    
    cy.contains('Teams').should('be.visible');

    cy.contains('Create a Team').click();

    cy.contains('Add a new team').should('be.visible');

    cy.get('input#name').type('New Cypress Team');

    cy.contains('Add new team').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Team added successfully!');
    });


    cy.contains('New Cypress Team').should('be.visible');
  });
});
