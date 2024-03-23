import { API_PROVEEDORES } from "../api-dirs";

Cypress.Commands.add("completarFormularioProveedor", (proveedor) => {
    cy.get("#nombre").clear();
    proveedor.nombre && cy.get("#nombre").type(proveedor.nombre);
    cy.get("#ruc").clear();
    proveedor.ruc && cy.get("#ruc").type(proveedor.ruc);
    cy.get("#email").clear();
    proveedor.email && cy.get("#email").type(proveedor.email);
    cy.get("#telefono").clear();
    proveedor.telefono && cy.get("#telefono").type(proveedor.telefono);
    cy.get("#direccion").clear();
    proveedor.direccion && cy.get("#direccion").type(proveedor.direccion);
    cy.get("#btn-guardar").click();
});

Cypress.Commands.add("registrarProveedor", (proveedor) => {
    cy.intercept("POST", API_PROVEEDORES).as("registrarProveedor");

    cy.get("#btn-crear").click();
    cy.completarFormularioProveedor(proveedor);

    cy.wait("@registrarProveedor").its("response.statusCode").should("eq", 201);

    cy.get("@registrarProveedor").should((req) => {
        expect(req.request.body.nombre).to.deep.equal(proveedor.nombre);
    });
});

Cypress.Commands.add("registrarProveedorFail", (proveedor) => {
    cy.get("#btn-crear").click();
    cy.completarFormularioProveedor(proveedor);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("buscarProveedor", (proveedor) => {
    cy.get("#input-search").clear();
    cy.get("#input-search").type(proveedor.nombre);
    cy.get("#btn-buscar").click();
    cy.get("table tr:first-child td:first-child")
        .first()
        .contains("td", proveedor.nombre);
    cy.get("table tr:first-child td:nth-child(2)")
        .first()
        .contains("td", proveedor.ruc);
    cy.get("table tr:first-child td:nth-child(3)")
        .first()
        .contains("td", proveedor.email);
    cy.get("table tr:first-child td:nth-child(4)")
        .first()
        .contains("td", proveedor.telefono);
    cy.get("table tr:first-child td:nth-child(5)")
        .first()
        .contains("td", proveedor.direccion);
});

Cypress.Commands.add("editarProveedor", (proveedor, proveedorUpdate) => {
    cy.buscarProveedor(proveedor);
    cy.get('a[id^="btn-editar-proveedor-"]:first').click();
    cy.completarFormularioProveedor(proveedorUpdate);
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});

Cypress.Commands.add("editarProveedorFail", (proveedor, proveedorUpdate) => {
    cy.buscarProveedor(proveedor);
    cy.get('a[id^="btn-editar-proveedor-"]:first').click();
    cy.completarFormularioProveedor(proveedorUpdate);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("borrarProveedor", (proveedor) => {
    cy.buscarProveedor(proveedor);
    cy.get('a[id^="btn-eliminar-proveedor-"]:first').click();
    cy.get(".confirm-button").click();
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});