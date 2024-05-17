import { PLANES_URL } from "../../front-dirs";

describe("Planes", () => {
  let users;
  let planes;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${PLANES_URL}`);
    });
    cy.fixture("planes.json").then((data)=>{
        ({ planes } = data);
    })
  });
  it("Recorrer planes",()=>{
    const {prueba}= planes;
    const {ejercicio}=planes;
    cy.buscarPlan(prueba);
    cy.crearEjercicio(ejercicio);
  })

});