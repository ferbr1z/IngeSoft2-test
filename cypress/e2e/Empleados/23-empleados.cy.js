import { EMPLEADOS_URL } from "../../front-dirs";

describe("Empleados", () => {
  let empleados;
  let users;

  beforeEach(() => {
    cy.fixture("empleados.json").then((data) => {
      ({ empleados } = data);
    });
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${EMPLEADOS_URL}`);
    });
  });

  it("Agregar empleado", () => {
    const { empleadosCreate } = empleados;
    cy.registrarEmpleado(empleadosCreate);
  });


  it("Buscar empleado", () => {
    const { empleadosCreate } = empleados;
    cy.buscarEmpleado(empleadosCreate);
  });

  it("Editar empleado", () => {
    const { empleadosCreate, empleadosUpdate } = empleados;
    cy.editarEmpleado(empleadosCreate, empleadosUpdate);
  });

  it("Eliminar empleado", () => {
    const { empleadosCreate } = empleados;
    cy.borrarEmpleado(empleadosCreate.nombre); 
  });

});