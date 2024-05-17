import { FACTURAS_URL } from "../../front-dirs";
describe("Registrar facturas",()=>{
    let facturas;
    let users;
    beforeEach(()=>{
        cy.fixture("facturas.json").then((data)=>{
            ({facturas} = data);
        });
        cy.fixture("users.json").then((data) => {
            ({ users } = data);
            cy.login(users.admin.email, users.admin.password);
            cy.visit(`${FACTURAS_URL}`);
        }); 
    });
    it("Registrar factura", () => {
        const { factura } = facturas;
        cy.registrarFactura(factura);

        cy.get(".go685806154").should("not.exist");
        cy.get(".go4109123758").should("not.exist");
    });
}
)