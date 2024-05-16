import { CAJA_URL } from "../../front-dirs";

describe("Ventas", () => {
    let cajas;
  let ventas;
  let users;
  let clientes;

  beforeEach(() => {
    cy.fixture("cajas.json").then((data) => {
        ({ cajas } = data);
      });
      cy.fixture("clientes.json").then((data) => {
        ({ clientes } = data);
      });
    cy.fixture("cajaVentas.json").then((data) => {
        ({ ventas } = data);
      });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CAJA_URL}`);
    });
  });



  it("Registrar una venta", () => {
    const { cajaTest} = cajas;
    cy.abrirCaja(cajaTest);
    const { venta } = ventas;
    const { producto } = ventas;
    cy.registrarVenta(venta,producto );
 
  });


  it("Buscar venta por nombre", () => {
    const { cajaTest} = cajas;
    cy.abrirCaja(cajaTest);
    const { clienteTest } = clientes;
    cy.buscarVentaMasReciente(clienteTest);
    
  });



});
