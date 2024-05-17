import { REPORTES_URL } from "../../front-dirs";

describe("Cajas", () => {
  let fechas;
  let users;

  beforeEach(() => {
    cy.fixture("fechas.json").then((data) => {
      fechas = data.fechas;
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${REPORTES_URL}`);
    });
  });

  it("Clientes nuevos", () => {
    const { nuevosClientes } = fechas;
    cy.filtrarClientesNuevos(nuevosClientes);
  });

  /*it("Abrir una caja",()=>{
    const { cajaTest } = cajas;
    cy.abrirCaja(cajaTest);
  })*/
});