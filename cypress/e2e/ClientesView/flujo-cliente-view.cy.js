import { CLIENTES_DASHBOARD_URL} from "../../front-dirs";
import { CLIENTES_ACTIVIDADES_URL } from "../../front-dirs";

describe("Clientes", () => {
  let users;
  let actividades;

  beforeEach(() => {
    cy.fixture("actividades.json").then((data) => {
        ({ actividades } = data);}),

    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.client.email, users.client.password);
      cy.visit(`${CLIENTES_DASHBOARD_URL}`);
    });
  });
  it("Flujo cliente",()=>{
    const {patinaje} = actividades;
    cy.wait(2000);
    cy.visit(`${CLIENTES_ACTIVIDADES_URL}`);
    cy.recorrer();
    cy.actividadesCliente(patinaje);

  })

});