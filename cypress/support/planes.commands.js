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
Cypress.Commands.add("buscarPlan",(plan)=>{
  cy.get("#btn-listar-ventas").click();
  cy.wait(2000);
  cy.get("#input-search").clear();
    cy.get("#input-search").type(plan.nombre);
    cy.get("#btn-buscar").click();
    cy.get("table tr:first-child td:first-child")
        .first()
        .click();
    
})
Cypress.Commands.add("crearEjercicio", (ejercicio) => {
  cy.get("#btn-nueva-venta").click();
  cy.get("#nombre").type(ejercicio.nombre);
  cy.get("#repeticiones").type(ejercicio.repeticiones);
  cy.get("#peso").type(ejercicio.peso);
  cy.get("#descripcion").type(ejercicio.descripcion, { force: true });
  cy.get("#tiempo").type(ejercicio.tiempo, { force: true });
  cy.get("#btn-crear").click();
  cy.reload();
  cy.wait(3000);

});
