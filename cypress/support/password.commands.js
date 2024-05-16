import { API_NEWPASS } from "../api-dirs";

Cypress.Commands.add("completarPass", (pass) => {
    pass.passActual && cy.get("#input-actualpassword").type(pass.passActual);
    pass.nuevaPass && cy.get("#input-newpassword").type(pass.nuevaPass);
    pass.confirmarPass && cy.get("#input-reppassword").type(pass.confirmarPass);
    cy.get("#btn-aceptar").click();
});


Cypress.Commands.add("cambiarPass", (pass) => {
    cy.intercept("POST", API_NEWPASS).as("cambiarPass");
    cy.contains("Cambiar contraseña").click();
    cy.completarPass(pass);

    cy.wait("@cambiarPass", { timeout: 10000 }).its("response.statusCode").should("eq", 200);
    
});

