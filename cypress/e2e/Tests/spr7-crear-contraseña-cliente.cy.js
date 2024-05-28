import { CLIENTES_URL } from "../../front-dirs";
import { CLIENTES_DASHBOARD_URL } from "../../front-dirs";
import { CAMBIAR_CONTRASENHA_CLIENTE_URL } from "../../front-dirs";


//Crear un cliente aleatorio
let cliente = {};
cliente.nombre = Math.random().toString(36).substring(7);
cliente.apellido = Math.random().toString(36).substring(7);
//random 6 digit number
cliente.ruc = Math.floor(100000 + Math.random() * 900000);
//8 digit starting with "0985" then "******"
cliente.telefono = "0985" + Math.random().toString().substring(2, 10);
cliente.email = Math.random().toString(36).substring(7) + "@gmail.com";
cliente.direccion = Math.random().toString(36).substring(7);

//6 characters, 1 uppercase, 1 lowercase, 1 number, 1 special = @
let newPassword = "Aa1@" + Math.random().toString(36).substring(7);

describe("Clientes", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
    });
  });

  //como admin , registrar cliente nuevo.
  it("Agregar cliente", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.url().should("eq", CLIENTES_URL);
    cy.registrarCliente(cliente);
    cy.logoutAdmin();
  });

  //iniciar sesion como cliente
  it("Cambiar contraseña ingesura", () => {
    cy.login(cliente.email, cliente.ruc);
    cy.contrasenhaInsegura(cliente.ruc, newPassword);
    cy.url().should("eq", CLIENTES_DASHBOARD_URL);
  });

  //iniciar sesion como cliente
  it("Recuperar contraseña", () => {
    cy.recuperarContrasenhaCliente(cliente.email);
  });

});
