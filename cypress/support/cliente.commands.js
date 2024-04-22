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

    cy.get("#btn-crear").click();
    cy.completarFormularioCliente(cliente);

    cy.wait("@registrarCliente", { timeout: 10000 }).its("response.statusCode").should("eq", 201);

    cy.get("@registrarCliente").should((req) => {
        expect(req.request.body.ruc).to.deep.equal(cliente.ruc);
    });
});

Cypress.Commands.add("registrarClienteFail", (cliente) => {
    cy.get("#btn-registrar").click();
    cy.completarFormularioCliente(cliente);
    cy.wait(2000);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("buscarCliente", (cliente) => {
    cy.get("#input-search").clear();
    cy.get("#input-search").type(cliente.nombre);
    cy.wait(1000);
    cy.get("#btn-Buscar").click();
    cy.get("#btn-Buscar").click();
    
    cy.get("table tr:first-child td:first-child")
        .first()
        .contains("td", cliente.nombre);
});

Cypress.Commands.add("editarCliente", (cliente, clienteUpdate) => {
    cy.buscarCliente(cliente);
    cy.wait(1000);
    cy.get('a[id^="btn-editar-cliente-"]:first').click();
//MODAL DE EDICION APAREZCA
    cy.get('.modal.fade').should('be.visible');
    cy.wait(1000);
    // LIMPIA LOS CAMPOS
    cy.get("#nombreEdit").clear();
    cy.get("#rucEdit").clear();
    cy.get("#telefonoEdit").clear();
    cy.get("#emailEdit").clear();
    cy.get("#direccionEdit").clear();
//COMPLETAMOS
    cy.get("#nombreEdit").type(clienteUpdate.nombre);
    cy.get("#rucEdit").type(clienteUpdate.ruc);
    cy.get("#telefonoEdit").type(clienteUpdate.telefono);
    cy.get("#emailEdit").type(clienteUpdate.email);
    cy.get("#direccionEdit").type(clienteUpdate.direccion);

    cy.get("#btn-guardarEdit").click();

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});


/*
Cypress.Commands.add("editarClienteFail", (cliente, clienteUpdate) => {
    cy.buscarCliente(cliente);
    cy.get('a[id^="btn-editar-cliente-"]:first').click();
    cy.completarFormularioCliente(clienteUpdate);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});
*/
Cypress.Commands.add("borrarCliente", (cliente) => {
    cy.buscarCliente(cliente);
    cy.wait(1000);
    cy.get('a[id^="btn-eliminar-cliente-"]:first').then(($e) => {
        if ($e.length > 0) {
            cy.wrap($e).click();
            cy.get(".confirm-button").click();
        }
    });
});