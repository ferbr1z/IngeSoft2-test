import { CLIENTES_URL } from "../../front-dirs";
import { CAJA_URL } from "../../front-dirs";

/*describe("Clientes", () => {
  let clientes;
  let users;

  beforeEach(() => {
    cy.fixture("clientes.json").then((data) => {
      ({ clientes } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CLIENTES_URL}`);
    });
  });

  it("Agregar cliente", () => {
    const { cliente } = clientes;
    cy.registrarCliente(cliente);
  });

  it("Buscar cliente", () => {
    const { cliente } = clientes;
    cy.buscarCliente(cliente);
  });

});
*/

//CAJA//



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
  
    /*it("Registrar una nueva caja", () => {
      const { caja } = cajas;
      cy.registrarCaja(caja);  
    });
  
    it("Buscar cajas", () => {
      const { caja } = cajas;
      cy.buscarCaja(caja);
    });
  /*
    it("Editar caja", () => {
      const { caja} = cajas;
      const {cajaEdit } = cajas;
      cy.editarCaja(caja, cajaEdit);
    });
  
    it("Eliminar Caja", () => {
      const { caja} = cajas;
      cy.borrarCaja(caja);
    });
    
    it("Registrar una nueva caja", () => {
      const { caja } = cajas;
      cy.registrarCaja(caja);  
    });
  */
    it("Abrir Caja", () => {
      const { cajaTest} = cajas;
      cy.abrirCaja(cajaTest);
    });
  });


//VENTAS


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
    const { cajaTest } = cajas;
    cy.abrirCaja(cajaTest);
    const { venta } = ventas;
    const { producto } = ventas;
    cy.registrarVenta(venta,producto);
  });

  it("Buscar venta por nombre", () => {
    const { cajaTest } = cajas;
    cy.abrirCaja(cajaTest);
    const { clienteTest } = clientes;
    cy.buscarVentaMasReciente(clienteTest);
  });

});


///COBROS PENDIENTES


describe("CobroPendiente", () => {
    let cajas;
    let ventas;
    let users;
  
    beforeEach(() => {
      cy.fixture("cajas.json").then((data) => {
        ({ cajas } = data);
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
    const { caja } = cajas;
    cy.abrirCaja(caja);
    const { venta } = ventas;
    const { producto } = ventas;
    cy.registrarVenta(venta,producto);
  });

  it("Cobrar una venta Pendiente", () => {
    const { caja} = cajas;
    cy.abrirCaja(caja);
    cy.cobrarFacturaPendiente();
    
  });


});


