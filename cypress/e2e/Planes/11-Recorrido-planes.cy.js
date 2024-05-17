import { PLANES_URL } from "../../front-dirs";

describe("Planes", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${PLANES_URL}`);
    });
  });
  it("Recorrer planes",()=>{
    cy.recorrerPlanes();
  })

});