import { PRODUCTOS_URL } from "../../front-dirs";

describe("Buscar producto", () => {
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

    it("Buscar producto con iva 10", () => {
        const { productoIva10 } = productos;
        cy.buscarProducto(productoIva10);
    });

    it("Buscar producto con iva 5", () => {
        const { productoIva5 } = productos;
        cy.buscarProducto(productoIva5);
    });

    it("Buscar producto con iva 0", () => {
        const { productoIva0 } = productos;
        cy.buscarProducto(productoIva0);
    });

});