import { CLIENTES_URL } from "../../front-dirs";
import { CLIENTES_DASHBOARD_URL } from "../../front-dirs";
import { CAMBIAR_CONTRASENHA_CLIENTE_URL } from "../../front-dirs";
import { SERVICIOS_URL } from "../../front-dirs";
import { API_ACTIVIDADES, API_URL } from "../../api-dirs";

// Crear un cliente aleatorio
let cliente = {};
cliente.nombre = Math.random().toString(36).substring(7);
cliente.apellido = Math.random().toString(36).substring(7);
cliente.ruc = Math.floor(100000 + Math.random() * 900000);
cliente.telefono = "0985" + Math.random().toString().substring(2, 10);
cliente.email = Math.random().toString(36).substring(7) + "@gmail.com";
cliente.direccion = Math.random().toString(36).substring(7);

// Generar una contraseña segura
let newPassword = "Aa1@" + Math.random().toString(36).substring(7);

let servicio = {};
servicio.nombre = Math.random().toString(36).substring(7);
servicio.descripcion = Math.random().toString(36).substring(7);
servicio.costoMensual = Math.floor(Math.random() * 1000) + 1000;
servicio.costoSemanal = Math.floor(Math.random() * 1000);
servicio.entrenador = "Julio";

describe("Clientes", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      users = data.users;
    });
  });

  // Como admin, registrar un cliente nuevo
  it("Agregar cliente", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.url().should("eq", CLIENTES_URL);
    cy.registrarCliente(cliente);
  });

  // Iniciar sesión como cliente y cambiar contraseña insegura
  it("Cambiar contraseña insegura", () => {
    cy.login(cliente.email, cliente.ruc);
    cy.contrasenhaInsegura(cliente.ruc, newPassword);
    cy.url().should("eq", CLIENTES_DASHBOARD_URL);
  });

  // Recuperar contraseña
  it("Recuperar contraseña", () => {
    cy.recuperarContrasenhaCliente(cliente.email);
  });

  // Como admin, registrar un servicio
  it("Agregar servicio", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.url().should("eq", CLIENTES_URL);
    cy.visit(SERVICIOS_URL);
    cy.get("#btn-crear").click();
    cy.registrarServicioEntrenador(servicio);
    cy.intercept("POST", API_ACTIVIDADES).as("registrarServicio");
    cy.wait("@registrarServicio").its("response.statusCode").should("eq", 201);
  });

  // Agregar clientes al nuevo servicio
  //NO SE PUEDE IMPLEMENTAR AUN, HAY QUE SOLUCIONAR SCRUM-218
  it("Agregar cliente al servicio", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.url().should("eq", CLIENTES_URL);
    cy.visit(SERVICIOS_URL);

    let found = false;

  });
});
