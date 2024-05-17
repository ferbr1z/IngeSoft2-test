import { PROVEEDORES_URL } from "../../front-dirs";

describe("Registrar proveedor", () => {
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

    it("Registrar proveedor", () => {
        const { proveedor } = proveedores;
        cy.registrarProveedor(proveedor);

        cy.get(".go685806154").should("not.exist");
        cy.get(".go4109123758").should("not.exist");
    });

    /************************************************
     *************** TESTS DE ERRORES ***************
     ************************************************/

    it("Registrar proveedor con error de nombre", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedorSinNombre } = proveedores;
        cy.registrarProveedorFail(proveedorSinNombre);

        cy.get(".go685806154").should("exist");
    });

    it("Registrar proveedor con error de ruc", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedorSinRuc } = proveedores;
        cy.registrarProveedorFail(proveedorSinRuc);

        cy.get(".go685806154").should("exist");
    });

    it("Registrar proveedor con error de telefono", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedorSinTelefono } = proveedores;
        cy.registrarProveedorFail(proveedorSinTelefono);

        cy.get(".go685806154").should("exist");
    });

    it("Registrar proveedor con error de email", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedorSinEmail } = proveedores;
        cy.registrarProveedorFail(proveedorSinEmail);

        cy.get(".go685806154").should("exist");
    });

    it("Registrar proveedor con error de direccion", () => {
        cy.get(".error-container").should("not.exist");

        const { proveedorSinDireccion } = proveedores;
        cy.registrarProveedorFail(proveedorSinDireccion);

        cy.get(".go685806154").should("exist");
    });
});