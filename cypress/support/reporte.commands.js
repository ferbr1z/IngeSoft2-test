
Cypress.Commands.add("filtrarClientesNuevos", (fechas) => {
    cy.get("#inicio").invoke('attr', 'value', fechas.inicio);
    cy.get("#fin").invoke('attr', 'value', fechas.fin);
    cy.get("#btn-filtrar-fecha").click();
    cy.wait(5000);
});