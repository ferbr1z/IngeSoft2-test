import { MIUSUARIO_URL } from "../../front-dirs";
import { API_LOGIN } from "../../api-dirs";
import { generateClient, generatePassword } from "../../utils/randomGenerator";
let cliente = generateClient();
let newPassword = generatePassword();

describe("Cambiar Contraseña", () => {
    let users;
    const newPass = { passActual: cliente.ruc, nuevaPass: newPassword, confirmarPass: newPassword}

    beforeEach(() => {
        cy.fixture("users.json").then((data) => {
            ({ users } = data);
        });
    });

    it("Crear el cliente para cambiar la contrasenha", () => {
        cy.login(users.admin.email, users.admin.password);
        cy.registrarCliente(cliente);
    });

    it("Cambiar Contrasenha", () => {
        cy.login(cliente.email, cliente.ruc);
        cy.visit(`${MIUSUARIO_URL}`);      
        cy.cambiarPass(newPass);
    });

    it("Iniciar sesión con la nueva contraseña", () => {
        cy.login(cliente.email, newPass.nuevaPass);
        cy.visit(`${MIUSUARIO_URL}`);
    });

});
