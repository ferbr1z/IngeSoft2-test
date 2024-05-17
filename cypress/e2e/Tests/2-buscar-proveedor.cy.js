import { PROVEEDORES_URL } from "../../front-dirs";

describe("Buscar proveedor", () => {
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

    it("Buscar proveedor", () => {
        const { proveedor } = proveedores;
        cy.buscarProveedor(proveedor);
    });
});