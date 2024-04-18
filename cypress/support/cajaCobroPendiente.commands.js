import { API_FACTURAVENTA } from "../api-dirs";


Cypress.Commands.add("cobrarFacturaPendiente", () => {
    cy.get("#btn-listar-cobros").click();
    cy.get("table tbody tr:first-child td:nth-child(2)")
      .click();
      
     // cy.contains('td.py-3', cliente.nombre).click();

      cy.contains('Cobrar Factura').click();

      cy.get("#efectivo").type(500000);

      cy.get("#btn-cobrar").click();
      cy.wait(2000);

      cy.get("#btn-cerrar").click();
});
