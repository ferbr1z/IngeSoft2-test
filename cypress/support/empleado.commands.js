import { API_EMPLEADOS } from "../api-dirs";

Cypress.Commands.add("completarFormularioEmpleado", (empleado) => {
    cy.get("#input-name").clear();
    empleado.nombre && cy.get("#input-name").type(empleado.nombre);
    cy.get("#input-cedula").clear();
    empleado.cedula && cy.get("#input-cedula").type(empleado.cedula);
    cy.get("#input-phone").clear();
    empleado.telefono && cy.get("#input-phone").type(empleado.telefono);
    cy.get("#input-direccion").clear();
    empleado.direccion && cy.get("#input-direccion").type(empleado.direccion);
    cy.get("#input-email").clear();
    empleado.email && cy.get("#input-email").type(empleado.email);
    empleado.rol && cy.get("#rol").select(empleado.rol);
    cy.get("#btn-aceptar").click();
});

Cypress.Commands.add("registrarEmpleado", (empleado) => {
    cy.intercept("POST", API_EMPLEADOS).as("registrarEmpleado");

    cy.get("#btn-crearUser").click();
    cy.completarFormularioEmpleado(empleado);

    cy.wait("@registrarEmpleado", { timeout: 10000 }).its("response.statusCode").should("eq", 201);

    cy.get("@registrarEmpleado").should((req) => {
        expect(req.request.body.cedula).to.deep.equal(empleado.cedula);
    });
});

Cypress.Commands.add("registrarEmpleadoFail", (empleado) => {
    cy.get("#btn-crearUser").click();
    cy.completarFormularioEmpleado(empleado);
    cy.wait(2000);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".error-message").should("exist");
});

Cypress.Commands.add("buscarEmpleado", (empleado) => {
    cy.get("#input-search").clear();
    cy.get("#input-search").type(empleado.nombre);
    cy.wait(1000);
    cy.get("#btn-search").click();
    cy.get("#btn-search").click();
    
});

Cypress.Commands.add("editarEmpleado", (empleadoUpdate) => {
    cy.contains('tr', empleadoUpdate.nombre).find('a[id^="btn-edit"]').click();
    cy.get('.modal.fade').should('be.visible');
    cy.wait(1000);
    // LIMPIA LOS CAMPOS
    cy.get("#input-cedula").clear();
    cy.get("#input-phone").clear();
    cy.get("#input-direccion").clear();
    // COMPLETAMOS
    cy.get("#input-cedula").type(empleadoUpdate.cedula);
    cy.get("#input-phone").type(empleadoUpdate.telefono);
    cy.get("#input-direccion").type(empleadoUpdate.direccion);

    cy.get("#btn-aceptar").click();

    cy.get(".success-message").should("not.exist");
    cy.get(".error-message").should("not.exist");
});


Cypress.Commands.add("borrarEmpleado", (nombreEmpleado) => {
    cy.contains('tr', nombreEmpleado).find('a[id^="btn-delete"]').click();
    cy.get(".confirm-button").click();
});
