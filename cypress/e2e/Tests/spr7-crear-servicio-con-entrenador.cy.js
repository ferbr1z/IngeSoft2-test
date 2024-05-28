import { SERVICIOS_URL, CLIENTES_URL } from "../../front-dirs";

let servicio;
//nombre, descripcion, costoMensual, costoSemanal, entrenador (julio)
servicio.nombre = Math.random().toString(36).substring(7);
servicio.descripcion = Math.random().toString(36).substring(7);
servicio.costoMensual = Math.floor(Math.random() * 1000) + 1000;
servicio.costoSemanal = Math.floor(Math.random() * 1000) + 1000;
servicio.entrenador = "Julio";

describe("Servicios", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
    });
  });

  //como admin , registrar servicio
  it("Agregar servicio", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.url().should("eq", CLIENTES_URL);
    cy.visit(`${SERVICIOS_URL}`);
    cy.registrarServicio(servicio);
  });


});
