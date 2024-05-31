import { CLIENTES_URL } from "../../front-dirs";
import { CLIENTES_DASHBOARD_URL } from "../../front-dirs";
import { CAMBIAR_CONTRASENHA_CLIENTE_URL } from "../../front-dirs";
import { SERVICIOS_URL } from "../../front-dirs";
import { API_ACTIVIDADES, API_URL } from "../../api-dirs";
import { generateClient, generateService } from "../../utils/randomGenerator";

// Crear un cliente aleatorio
let cliente = generateClient();

// Generar una contraseña segura
let newPassword = "Aa1@" + Math.random().toString(36).substring(7);

let servicio = generateService();

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
    cy.get('#input-search').type(servicio.nombre);
    cy.get('#btn-buscar').click();
    cy.wait(1000);
    cy.contains(servicio.nombre).click();

    //agregar clientes
    cy.get('#btn-Crear').click();
    cy.get('#cedula').type(cliente.ruc);
    cy.wait(500);
    //today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;
    cy.get('#fechaInicio').type(todayDate);

    cy.get('#btn-guardar').click();
  });
});
