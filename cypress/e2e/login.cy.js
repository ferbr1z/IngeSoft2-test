const { API_URL } = require("../direcciones");

describe("Login", () => {
  let users;

  before(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
    });
  });

  it("Visitar página principal", () => {
    cy.visit(API_URL);
    cy.title().should("eq", "PowerFit");
  });

  it("Iniciar sesión como administrador", () => {
    const { admin } = users;
    cy.login(admin.email, admin.password);
  });
});
