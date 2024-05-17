import { PRODUCTOS_URL } from "../../front-dirs";

describe("Crear producto", () => {
  let productos;
  let users;

  beforeEach(() => {
    cy.fixture("productos.json").then((data) => {
      ({ productos } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${PRODUCTOS_URL}`);
    });
  });


  it("Crear producto con iva 0", () => {
    const { productoIva0 } = productos;
    cy.crearProducto(productoIva0);

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
  });

  it("Crear producto con iva 5", () => {
    const { productoIva5 } = productos;
    cy.crearProducto(productoIva5);

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
  });

  it("Crear producto con iva 10", () => {
    const { productoIva10 } = productos;
    cy.crearProducto(productoIva10);

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
  });
  
  /************************************************
   *************** TESTS DE ERRORES ***************
   ************************************************/

  it("Crear producto con error de codigo", () => {
    cy.get(".error-container").should("not.exist");

    const { productoErrorCodigo } = productos;
    cy.crearProductoFail(productoErrorCodigo);

    cy.get(".go685806154").should("exist");
  });

  it("Crear producto con error de precio", () => {
    cy.get(".error-container").should("not.exist");

    const { productoErrorPrecio } = productos;

    cy.crearProductoFail(productoErrorPrecio);

    cy.get(".go685806154").should("exist");
  });

  it("Crear producto con error de cantidad", () => {
    cy.get(".error-container").should("not.exist");

    const { productoErrorCantidad } = productos;

    cy.crearProductoFail(productoErrorCantidad);


  });
});
