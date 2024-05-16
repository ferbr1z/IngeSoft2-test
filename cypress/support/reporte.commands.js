Cypress.Commands.add("filtrarClientesNuevos", (fechas) => {
    cy.get("#fechaInicio").click(); // Hacer clic en el date picker de fechaInicio
  
    cy.contains('29').first().click(); // Seleccionar el primer día 29 que aparezca
  
    cy.get("#btn-filtrar-fecha").click();
    cy.wait(5000);
  });