import { CLIENTES_URL } from "../../front-dirs";
import { SERVICIOS_URL } from "../../front-dirs";
import { API_ACTIVIDADES, API_URL } from "../../api-dirs";
import { generateService } from "../../utils/randomGenerator";

let servicio = generateService();

describe("Clientes", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      users = data.users;
    });
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

});
