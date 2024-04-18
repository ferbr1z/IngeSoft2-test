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
    const { caja} = cajas;
    cy.abrirCaja(caja);
    const { venta } = ventas;
    const { producto } = ventas;
    cy.registrarVenta(venta,producto );
 
  });


  it("Buscar venta por nombre", () => {
    const { caja} = cajas;
    cy.abrirCaja(caja);
    const { cliente } = clientes;
    cy.buscarVentaMasReciente(cliente);
    
  });



});
