import { API_PRODUCTOS } from "../api-dirs";

Cypress.Commands.add("completarFormularioProducto", (producto) => {
    cy.get("#nombre").clear();
    producto.nombre && cy.get("#nombre").type(producto.nombre);
    cy.get("#descripcion").clear();
    producto.descripcion && cy.get("#descripcion").type(producto.descripcion);
    cy.get("#codigo").clear();
    producto.codigo && cy.get("#codigo").type(producto.codigo);
    cy.get("#costo").clear();
    producto.costo && cy.get("#costo").type(producto.costo);
    cy.get("#precio").clear();
    producto.precio && cy.get("#precio").type(producto.precio);
    cy.get("#cantidad").clear();
    producto.cantidad && cy.get("#cantidad").type(producto.cantidad);
    producto.iva && cy.get("#iva").select(producto.iva);
    cy.get("#btn-guardar").click();
});

Cypress.Commands.add("crearProducto", (producto) => {
    cy.intercept("POST", API_PRODUCTOS).as("crearProducto");

    cy.get("#btn-crear").click();
    cy.completarFormularioProducto(producto);

    cy.wait("@crearProducto").its("response.statusCode").should("eq", 201);

    cy.get("@crearProducto").should((req) => {
        expect(req.request.body.nombre).to.deep.equal(producto.nombre);
    });
});

Cypress.Commands.add("crearProductoFail", (producto) => {
    cy.get("#btn-crear").click();
    cy.completarFormularioProducto(producto);
    // Comprueba de que se muestre el mensaje de error
    cy.get(".go3958317564").should("exist");
    cy.get(".go685806154").should("exist");
});

Cypress.Commands.add("buscarProducto", (producto) => {
    cy.get("#input-search").clear();
    cy.get("#input-search").type(producto.nombre);
    cy.get("#btn-buscar").click();
    cy.get("table tr:first-child td:first-child")
        .first()
        .contains("td", producto.nombre);
});

Cypress.Commands.add("editarProducto", (producto, productoUpdate) => {
    cy.buscarProducto(producto);
    cy.get('a[id^="btn-editar-producto-"]:first').click();
    cy.completarFormularioProducto(productoUpdate);
    cy.get(".go685806154").should("not.exist");
    cy.get(".go4109123758").should("not.exist");
});

Cypress.Commands.add("editarProductoFail", (producto, productoUpdate) => {
    cy.buscarProducto(producto);
    cy.get('a[id^="btn-editar-producto-"]:first').click();
    cy.completarFormularioProducto(productoUpdate);
    cy.get(".go685806154").should("exist");
    cy.get(".go4109123758").should("exist");
});

Cypress.Commands.add("borrarProducto", (producto) => {
    cy.buscarProducto(producto);

    cy.get('a[id^="btn-eliminar-producto-"]:first').then(($e) => {
        if ($e.length > 0) {
            cy.wrap($e).click();
            cy.get(".confirm-button").click();
        }
    });
});
