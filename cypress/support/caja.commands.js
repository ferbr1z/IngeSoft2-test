import { API_CAJA } from "../api-dirs";

Cypress.Commands.add("completarFormularioCaja", (caja) => {
  cy.get("#input-nombre-caja").clear();
  caja.nombre && cy.get("#input-nombre-caja").type(caja.nombre);
  cy.get("#input-monto-caja").clear();
  caja.monto && cy.get("#input-monto-caja").type(caja.monto);
  cy.get("#btn-registrar-caja-new").click();

});

Cypress.Commands.add("registrarCaja", (caja) => {
  cy.intercept("POST", API_CAJA).as("registrarCaja");

  cy.get("#btn-registrar-caja").click();
  cy.completarFormularioCaja(caja);
  cy.wait(4000);
  cy.buscarCaja(caja);
});


Cypress.Commands.add("buscarCaja", (caja) => {
  
  cy.get("#btn-ver-cajas").click();
  cy.get("#input-search").clear();
  cy.get("#input-search").type(caja.nombre);
  cy.get("#btn-buscar").click();
 
  cy.get("table").should("be.visible");

  cy.get("table tbody tr:first-child th:first-child")
  .should("contain.text", caja.nombre);


});

Cypress.Commands.add("editarCaja", (caja, cajaUpdate) => {
  cy.buscarCaja(caja);
  
  cy.get('table tbody tr:first-child td:last-child')
  .find('svg[id^="btn-edit-caja-"]')
  .click();
//MODAL DE EDICION APAREZCA
  cy.get('.modal.fade').should('be.visible');

  // LIMPIA LOS CAMPOS
  cy.get("#input-nombre-caja").clear();
  cy.get("#input-monto-caja").clear();
//COMPLETAMOS
  cy.get("#input-nombre-caja").type(cajaUpdate.nombre);
  cy.get("#input-monto-caja").type(cajaUpdate.monto);

  cy.get("#btn-registrar-caja-new").click();

  cy.get(".go685806154").should("not.exist");
  cy.get(".go4109123758").should("not.exist");
});


Cypress.Commands.add("borrarCaja", (cajaEdit) => {
  cy.buscarCaja(cajaEdit);
  cy.get('table tbody tr:first-child td:last-child')
  .find('svg[id^="btn-delete-caja-"]').then(($e) => {
      if ($e.length > 0) {
          cy.wrap($e).click();
          cy.get(".confirm-button").click();
      }
  });
});
Cypress.Commands.add("abrirCaja", (caja) => {
    cy.get("#input-select-cajas").select(caja.nombre); // Seleccionar la caja por su nombre

  cy.get("#btn-abrir-caja").click();
});






