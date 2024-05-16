import { API_LOGIN } from "../api-dirs";
import { APP_URL } from "../front-dirs";

Cypress.Commands.add("completarFormularioLogin", (email, password) => {
  cy.get("#login-email").type(email);
  cy.get("#login-password").type(password);
});

Cypress.Commands.add("login", (email, password) => {
  // Vamos a interceptar la llamada a la api
  cy.intercept("POST", API_LOGIN).as("loginRequest");

  cy.visit(APP_URL);
  cy.completarFormularioLogin(email, password);

  cy.get("#login").click();

  // Espera que la api responda
  cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
});

Cypress.Commands.add("loginFail", (email, password) => {
  // Logeamos
  cy.visit(APP_URL);
  
  cy.completarFormularioLogin(email, password);
  cy.get("#login").click();

  cy.get(".go4109123758").should("exist");

});

Cypress.Commands.add("logout", () => {

  cy.contains("Julio Benitez").click(); // Reemplaza "nombre-de-usuario" con el texto exacto del nombre de usuario

  // Hacer clic en la opción de "Cerrar sesión"
  cy.contains("Cerrar Sesión").click();
});