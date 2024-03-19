import {API_URL, PRODUCTOS } from "../../direcciones";

describe("Crear producto", () => {
    let productos;
    let users;
    before(() => {
        cy.fixture("productos.json").then((data) => {
        ({ productos } = data);
        });
        cy.fixture("users.json").then((data) => {
        ({ users } = data);
        });
    });
    
   
    it("Crear producto con iva 0", () => {
        cy.login(users.admin.email, users.admin.password);
        cy.visit(`${API_URL}/${PRODUCTOS}`);

        const {productoIva5} = productos;

        cy.get("MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1fmmxcw-MuiButtonBase-root-MuiIconButton-root").click();
        
        cy.get("#nombre").type(productoIva5.nombre);  
        cy.get("#descripcion").type(productoIva5.descripcion);
        cy.get("#cantidad").type(productoIva5.cantidad);
        cy.get("#costo").type(productoIva5.costo);
        cy.get("#precio").type(productoIva5.precio);
        cy.get("#iva_id").select(productoIva5.iva_id);
        
        cy.get("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1fmmxcw-MuiButtonBase-root-MuiIconButton-root").click();

    });

});