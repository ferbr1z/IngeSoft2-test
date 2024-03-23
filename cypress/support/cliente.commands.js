import { API_CLIENTES } from "../api-dirs";

Cypress.Commands.add("completarFormularioCliente", (cliente) => {
    cy.get("#nombre").clear();
    cliente.nombre && cy.get("#nombre").type(cliente.nombre);
    cy.get("#apellido").clear();
    cliente.apellido && cy.get("#apellido").type(cliente.apellido);
    cy.get("#ruc").clear();
    cliente.ruc && cy.get("#ruc").type(cliente.ruc);
    cy.get("#telefono").clear();
    cliente.telefono && cy.get("#telefono").type(cliente.telefono);
    cy.get("#email").clear();
    cliente.email && cy.get("#email").type(cliente.email);
    cy.get("#direccion").clear();
    cliente.direccion && cy.get("#direccion").type(cliente.direccion);
    cy.get("#btn-guardar").click();
});

Cypress.Commands.add("registrarCliente", (cliente) => {
    cy.intercept("POST", API_CLIENTES).as("registrarCliente");

    cy.get("#botton-crear").click();
    cy.completarFormularioCliente(cliente);

    cy.wait("@registrarCliente").its("response.statusCode").should("eq", 201);

    cy.get("@registrarCliente").should((req) => {
        expect(req.request.body.nombre).to.deep.equal(cliente.nombre);
    });
});

Cypress.Commands.add("registrarClienteFail", (cliente) => {
    cy.get("#btn-registrar").click();
    cy.completarFormularioCliente(cliente);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("buscarCliente", (cliente) => {
    cy.get("#input-search").clear();
    cy.get("#input-search").type(cliente.nombre);
    // el input es type text y el placeholder es Buscar...
    cy.get('input.form-control.mt-3.custom-input[placeholder="Buscar..."]').type(cliente.nombre);
    cy.get("#btn-buscar").click();
    cy.get("table tr:first-child td:first-child")
        .first()
        .contains("td", cliente.nombre);
});

Cypress.Commands.add("editarCliente", (cliente, clienteUpdate) => {
    cy.buscarCliente(cliente);
    cy.get('a[id^="btn-editar-cliente-"]:first').click();
    cy.completarFormularioCliente(clienteUpdate);
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});

Cypress.Commands.add("editarClienteFail", (cliente, clienteUpdate) => {
    cy.buscarCliente(cliente);
    cy.get('a[id^="btn-editar-cliente-"]:first').click();
    cy.completarFormularioCliente(clienteUpdate);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("borrarCliente", (cliente) => {
    cy.buscarCliente(cliente);
    cy.get('a[id^="btn-eliminar-cliente-"]:first').click();
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});