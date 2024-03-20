import { API_URL, PRODUCTOS } from "../../direcciones";

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
      cy.visit(`${API_URL}/${PRODUCTOS}`);
    });
  });

  

  it("Crear producto con iva 0", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.visit(`${API_URL}/${PRODUCTOS}`);

    const { productoIva0 } = productos;
    cy.crearProducto(productoIva0);

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");

    cy.buscarProducto(productoIva0);
    cy.get('table tr:first-child td:first-child').first().contains('td', productoIva0.nombre);
    cy.borrarProducto(productoIva0);
  });


  it("Crear producto con iva 5", () => {
    const { productoIva5 } = productos;

    cy.crearProducto(productoIva5);
    
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
   
    cy.buscarProducto(productoIva5);
    cy.get('table tr:first-child td:first-child').first().contains('td', productoIva5.nombre);
   
    cy.borrarProducto(productoIva5);
  });


  it("Crear producto con iva 10", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.visit(`${API_URL}/${PRODUCTOS}`);

    const { productoIva10 } = productos;
    cy.crearProducto(productoIva10);

    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");

    cy.buscarProducto(productoIva10);
    cy.get('table tr:first-child td:first-child').first().contains('td', productoIva10.nombre);

    cy.borrarProducto(productoIva10);
  });


  it("Crear producto con error de codigo", () => {
    const { productoErrorCodigo } = productos;

    cy.crearProducto(productoErrorCodigo);

    cy.get(".go685806154").should("exist");
  });


  it("Crear producto con error de precio", () => {
    const { productoErrorPrecio } = productos;

    cy.crearProducto(productoErrorPrecio);

    cy.get(".go685806154").should("exist");

  });


  it("Crear producto con error de cantidad", () => {
    const { productoErrorCantidad } = productos;

    cy.crearProducto(productoErrorCantidad);

    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");

  });
});
