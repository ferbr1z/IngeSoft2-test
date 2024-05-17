import { MIUSUARIO_URL } from "../../front-dirs";
import { API_LOGIN } from "../../api-dirs";

describe("Cambiar Contraseña", () => {
    let passwords;
    let users;

    beforeEach(() => {
        cy.fixture("password.json").then((data) => {
            ({ passwords } = data);
        });
        cy.fixture("users.json").then((data) => {
            ({ users } = data);
            cy.login(users.test.email, users.test.password);
            cy.visit(`${MIUSUARIO_URL}`);
        });
    });

    it("Cambiar Contrasenha", () => {
        const { newPass } = passwords;
        cy.cambiarPass(newPass);
        cy.logout();
        cy.login("juliobenitez@fiuni.edu.py", newPass.nuevaPass);
        cy.visit(`${MIUSUARIO_URL}`);

    });
});
