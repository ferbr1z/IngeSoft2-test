
import { API_ACTIVIDADES } from "../api-dirs";

Cypress.Commands.add("registrarServicioEntrenador", (servicio) => {
  cy.get("#nombre").clear();
  servicio.nombre && cy.get("#nombre").type(servicio.nombre);
  cy.get("#descripcion").clear();
  servicio.descripcion && cy.get("#descripcion").type(servicio.descripcion);
  cy.get("#costoMensual").clear();
  servicio.descripcion && cy.get("#costoMensual").type(servicio.costoMensual);
  cy.get("#costoSemanal").clear();
  servicio.descripcion && cy.get("#costoSemanal").type(servicio.costoSemanal);
  cy.get("#input-entrenador").clear();
  servicio.descripcion && cy.get("#input-entrenador").type(servicio.entrenador);
  
  cy.get("#entrenador-3").click();

  cy.get("#btn-guardar").click();
  

});

