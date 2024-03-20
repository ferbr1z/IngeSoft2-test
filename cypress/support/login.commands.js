import { API_LOGIN } from "../api-dirs";
import { APP_URL } from "../front-dirs";

Cypress.Commands.add("login", (email, password) => {
    // Logeamos
    cy.visit(APP_URL);
    cy.get("#login-email").type(email);
    cy.get("#login-password").type(password);
    cy.get("#login").click();
})

Cypress.Commands.add("loginSuccess", (email, password) => {
  // Vamos a interceptar la llamada a la api
  cy.intercept("POST", API_LOGIN).as("loginRequest");

  cy.login(email, password);

  // Espera que la api responda
  cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
});
