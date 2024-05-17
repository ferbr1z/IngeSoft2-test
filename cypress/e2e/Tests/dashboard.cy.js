import { DASHBOARD_URL } from "../../front-dirs";

describe("Dashboard", () => {
  let fechas;
  let users;

  beforeEach(() => {
    cy.fixture("fechas.json").then((data) => {
      fechas = data.fechas;
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${DASHBOARD_URL}`);
    });
  });

  it("Clientes nuevos", () => {
    const { nuevosClientes } = fechas;
    cy.actualizarDashboard();
  });

  /*it("Abrir una caja",()=>{
    const { cajaTest } = cajas;
    cy.abrirCaja(cajaTest);
  })*/
});