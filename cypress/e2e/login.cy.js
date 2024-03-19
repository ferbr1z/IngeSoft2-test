import { API_URL, CLIENTES } from "../direcciones";

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
    cy.url().should("eq", `${API_URL}/${CLIENTES}`);
  });

  it("Iniciar sesión como administrador con password equivocado", () => {
    const { admin } = users;

    cy.login(admin.email, "pepito").then(() => {
      cy.get(".go4109123758").should("exist");
    });
  });

  it("Iniciar sesión con datos erroneos", () => {
    cy.login("elcorreodepepito@mail.com", "pepito").then(() => {
      cy.get(".go4109123758").should("exist");
    });
  });

});
