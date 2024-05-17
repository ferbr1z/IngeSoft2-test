import { CLIENTES_URL } from "../front-dirs";
import { CLIENTES_DASHBOARD_URL } from "../front-dirs";


describe("Login", () => {
  let users;

  before(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
    });
  });

  it("Iniciar sesión como administrador", () => {
    const { admin } = users;
    cy.login(admin.email, admin.password);
    cy.url().should("eq", CLIENTES_URL);
  });

  it("Iniciar sesión como cliente", () => {
    const { client } = users;
    cy.login(client.email, client.password);
    cy.url().should("eq", CLIENTES_DASHBOARD_URL);
  });
  /************************************************
   *************** TESTS DE ERRORES ***************
   ************************************************/

  it("Iniciar sesión como administrador con password equivocado", () => {
    const { admin } = users;

    cy.loginFail(admin.email, "pepito").then(() => {
    });
  });

  it("Iniciar sesión con datos erroneos", () => {
    cy.loginFail("elcorreodepepito@mail.com", "pepito").then(() => {
      cy.get(".go685806154").should("exist");
    });
  });
});

