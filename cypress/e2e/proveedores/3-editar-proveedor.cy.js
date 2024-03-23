import { PROVEEDORES_URL } from "../../front-dirs";

 
 describe("Editar proveedor", () => {
    let proveedores;
    let users;

    beforeEach(() => {
        cy.fixture("proveedores.json").then((data) => {
            ({ proveedores } = data);
        });
        cy.fixture("users.json").then((data) => {
            ({ users } = data);
            cy.login(users.admin.email, users.admin.password);
            cy.visit(`${PROVEEDORES_URL}`);
        });
    });

    it("Editar proveedor", () => {
        const { proveedor, proveedorUpdate } = proveedores;
        cy.editarProveedor(proveedor, proveedorUpdate);
    });

    /************************************************
     *************** TESTS DE ERRORES ***************
     ************************************************/

    it("Editar proveedor con error de nombre", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedor, proveedorSinNombre } = proveedores;
        cy.editarProveedorFail(proveedor, proveedorSinNombre);
    });

    it("Editar proveedor con error de ruc", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedor, proveedorSinRuc } = proveedores;
        cy.editarProveedorFail(proveedor, proveedorSinRuc);
    });

    it("Editar proveedor con error de telefono", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedor, proveedorSinTelefono } = proveedores;
        cy.editarProveedorFail(proveedor, proveedorSinTelefono);
    });

    it("Editar proveedor con error de email", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedor, proveedorSinEmail } = proveedores;
        cy.editarProveedorFail(proveedor, proveedorSinEmail);
    });

});