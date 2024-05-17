import { CAJA_URL } from "../../front-dirs";

describe("Cajas", () => {
  let cajas;
  let users;

  beforeEach(() => {
    cy.fixture("cajas.json").then((data) => {
      ({ cajas } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CAJA_URL}`);
    });
  });

  it("Registrar una nueva caja", () => {
    const { caja } = cajas;
    cy.registrarCaja(caja);  
  });

  it("Buscar cajas", () => {
    const { caja } = cajas;
    cy.buscarCaja(caja);
  });

  it("Eliminar Caja", () => {
    const { caja} = cajas;
    cy.borrarCaja(caja);
  });
});
