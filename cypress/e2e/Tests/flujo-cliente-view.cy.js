import { CLIENTES_DASHBOARD_URL, CLIENTES_URL} from "../../front-dirs";
import { CLIENTES_ACTIVIDADES_URL } from "../../front-dirs";
import { generateClient } from "../../utils/randomGenerator";

let cliente = generateClient();

describe("Clientes", () => {
  let users;
  let actividades;

  beforeEach(() => {
    cy.fixture("actividades.json").then((data) => {
        ({ actividades } = data);}),

    cy.fixture("users.json").then((data) => {
      ({ users } = data);
    });
  });

  it("Registrar el cliente a usar", () => {
    cy.login(users.admin.email, users.admin.password);
    cy.visit(`${CLIENTES_URL}`);
    cy.registrarCliente(cliente);
  });

  it("Flujo cliente",()=>{
    cy.login(cliente.email, cliente.ruc);
    cy.visit(`${CLIENTES_DASHBOARD_URL}`);
    cy.wait(2000);
    cy.visit(`${CLIENTES_ACTIVIDADES_URL}`);
    cy.recorrer();
    cy.visit(`${CLIENTES_ACTIVIDADES_URL}`);
    cy.clickCardByIndex(1);
  })

});