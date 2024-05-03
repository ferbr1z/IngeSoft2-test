Cypress.Commands.add("abrirCaja", (caja) => {
    cy.get("#input-select-cajas").select(caja.nombre); // Seleccionar la caja por su nombre

  cy.get("#btn-abrir-caja").click();
});
Cypress.Commands.add("recorrerPlanes",()=>{
    cy.get("#btn-listar-ventas").click();
    cy.wait(2000);
    cy.get("#btn-flecha-volver-atras").click();
    cy.wait(2000)
    cy.get("#btn-listar-compras").click();
    cy.wait(2000);
    cy.get("#btn-flecha-volver-atras").click();
    cy.wait(2000)
    cy.get("#btn-listar-compras").click();
    cy.wait(2000);
    cy.get("#btn-flecha-volver-atras").click();
})