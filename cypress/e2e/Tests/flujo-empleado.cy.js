import { EMPLEADOS_URL } from "../../front-dirs";
import { generateEmployee } from "../../utils/randomGenerator";

let empleado = generateEmployee();
let empleadoUpdate = generateEmployee();

describe("Empleados", () => {
  let users;

  beforeEach(() => {
    cy.fixture("users.json").then((data) => {
      ({ users } = data);
      cy.login(users.admin.email, users.admin.password);
      cy.visit(`${EMPLEADOS_URL}`);
    });
  });

  it("Agregar empleado", () => {
    cy.registrarEmpleado(empleado);
  });


  it("Buscar empleado", () => {
    cy.buscarEmpleado(empleado);
  });

  it("Editar empleado", () => {
    cy.editarEmpleado(empleado, empleadoUpdate);
  });

  it("Eliminar empleado", () => {
    cy.borrarEmpleado(empleado.nombre); 
  });

});
