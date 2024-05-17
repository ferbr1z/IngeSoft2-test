import { PROVEEDORES_URL } from "../../front-dirs";

describe("Borrar proveedor", () => {
    let proveedores;
    let users;

    beforeEach(() => {
        cy.fixture("proveedores.json").then((data) => {
            ({ proveedorUpdate : proveedores } = data);
        });
        cy.fixture("users.json").then((data) => {
            ({ users } = data);
            cy.login(users.admin.email, users.admin.password);
            cy.visit(`${PROVEEDORES_URL}`);
        });
    });

    it("Borrar proveedor", () => {
        const { proveedorUpdate } = proveedores;
        cy.borrarProveedor(proveedorUpdate);
    });
});