import { CAJA_URL } from "../../front-dirs";

describe("CobroPendiente", () => {

  let users;

  beforeEach(() => {
    cy.fixture("cajas.json").then((data) => {
        ({ cajas } = data);
      });
      cy.fixture("clientes.json").then((data) => {
        ({ clientes } = data);
      });
  
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CAJA_URL}`);
    });
  });



  it("Cobrar una venta Pendiente", () => {
    //const { caja} = cajas;
    cy.abrirCajaPrimera();
    cy.cobrarFacturaPendiente();
    
  });


});
