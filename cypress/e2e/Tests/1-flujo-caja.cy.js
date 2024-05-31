import { CAJA_URL } from "../../front-dirs";
import { generateCaja } from "../../utils/randomGenerator";

let caja = generateCaja();

describe("Cajas", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CAJA_URL}`);
    });
  });

  it("Registrar una nueva caja", () => {
    cy.registrarCaja(caja);  
  });

  it("Buscar cajas", () => {
    cy.buscarCaja(caja);
  });

  it("Eliminar Caja", () => {
    cy.borrarCaja(caja);
  });
});
