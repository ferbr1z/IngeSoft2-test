import { API_FACTURAVENTA } from "../api-dirs";

Cypress.Commands.add("completarFormularioVenta", (venta) => {
    cy.get("#rucCliente").clear().type(venta.ruc).trigger("keydown", { key: "Tab", keyCode: 9 });


});

Cypress.Commands.add("completarFormularioVentaProducto", (producto) => {
    cy.get("#codigo").clear().type(producto.codigo).trigger("keydown", { key: "Tab", keyCode: 9 });
    cy.wait(1000);
    cy.get("#cantidad").clear();
    producto.cantidad && cy.get("#cantidad").type(producto.cantidad);
    cy.wait(1000);
    cy.get("#btn-agregarItem").click();
    
    cy.get("#btn-generarFactura").click();
  });

Cypress.Commands.add("registrarVenta", (venta,producto) => {
  cy.intercept("POST", API_FACTURAVENTA).as("registrarVenta");

  cy.get("#btn-nueva-venta").click();
  cy.completarFormularioVenta(venta);

cy.completarFormularioVentaProducto(producto);

cy.get("#btn-guardarFacturaModal").click();

cy.get("#btn-cerrarModalCobro").click();
cy.get("#btn-flecha-volver-atras").click();

});



Cypress.Commands.add("buscarVentaMasReciente", (cliente) => {
    cy.get("#btn-listar-cobros").click();
      cy.get("#input-search").type(cliente.nombre);
      cy.get("#btn-buscar").click();
      cy.get("table tbody tr:first-child td:nth-child(3)")
      .should("contain.text", cliente.nombre);
      
      cy.contains('td.py-3', cliente.nombre).click();

    });


Cypress.Commands.add("cobrarFacturaPendiente", (cliente) => {
    cy.get("#btn-listar-cobros").click();
    cy.get("table tbody tr:first-child td:nth-child(3)")
      .should("contain.text", cliente.nombre);
      
      cy.contains('td.py-3', cliente.nombre).click();

      cy.contains('Cobrar Factura').click();

      cy.get("#efectivo").type(500000);

      cy.get("#btn-cobrar").click();


      cy.get("#btn-cerrar").click();
});






