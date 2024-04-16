import { CLIENTES_URL } from "../../front-dirs";

describe("Clientes", () => {
  let clientes;
  let users;

  beforeEach(() => {
    cy.fixture("clientes.json").then((data) => {
      ({ clientes } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${CLIENTES_URL}`);
    });
  });

  it("Agregar cliente", () => {
    const { cliente } = clientes;
    cy.registrarCliente(cliente);
  });

  it("Buscar cliente", () => {
    const { cliente } = clientes;
    cy.buscarCliente(cliente);
  });

  it("Editar cliente", () => {
    const { cliente } = clientes;
    const {clienteEdit } = clientes;
    cy.editarCliente(cliente, clienteEdit);
  });

  it("Eliminar cliente", () => {
    const { cliente } = clientes;
    cy.borrarCliente(cliente); 
  });

});
