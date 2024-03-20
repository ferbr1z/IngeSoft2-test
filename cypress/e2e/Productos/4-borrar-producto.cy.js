import { PRODUCTOS_URL } from "../../front-dirs";

describe("Borrar producto", () => {
  let productos;
  let users;
  beforeEach(() => {
    cy.fixture("productos.json").then((data) => {
      ({ productos } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(PRODUCTOS_URL);
    });
  });

  it("Borrar producto con iva 10", () => {
    const { productoIva10Update } = productos;
    cy.borrarProducto(productoIva10Update);
  });

  it("Borrar producto con iva 5", () => {
    const { productoIva5 } = productos;
    cy.borrarProducto(productoIva5);
  });

  it("Borrar producto con iva 0", () => {
    const { productoIva0 } = productos;
    cy.borrarProducto(productoIva0);
  });
});
