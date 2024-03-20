import { PRODUCTOS_URL } from "../../front-dirs";

describe("Editar producto", () => {
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

  it("Editar producto con iva 10", () => {
    const { productoIva10 } = productos;
    const { productoIva10Update } = productos;
    cy.editarProducto(productoIva10, productoIva10Update);
  });

  it("Editar producto con datos erroneos", () => {
    const { productoIva10 } = productos;
    const { productoIva10UpdateError } = productos;
    cy.editarProductoFail(productoIva10, productoIva10UpdateError);
  });
});
