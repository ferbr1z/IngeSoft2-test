// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { API_URL } from "../direcciones";

Cypress.Commands.add("login", (email, password) => {
  cy.visit(API_URL);
  cy.get("#login-email").type(email);
  cy.get("#login-password").type(password);
  cy.get("#login").click();
});

Cypress.Commands.add("buscarProducto", (producto) => {
  cy.get("#input-search").clear();
  cy.get("#input-search").type(producto.nombre);
  cy.get("#btn-buscar").click();
});


Cypress.Commands.add("borrarProducto", (producto) => {
  cy.buscarProducto(producto);

  cy.get('a[id^="btn-eliminar-producto-"]:first').then(($e) => {
      if ($e.length > 0) {
          cy.wrap($e).click();
          cy.get(".confirm-button").click();
      }
  });
  
});

Cypress.Commands.add("crearProducto", (producto) => {
  cy.get("#btn-crear").click();
  cy.get("#nombre").type(producto.nombre);
  cy.get("#descripcion").type(producto.descripcion);
  cy.get("#codigo").type(producto.codigo);
  cy.get("#costo").type(producto.costo);
  cy.get("#precio").type(producto.precio);
  cy.get("#cantidad").type(producto.cantidad);
  cy.get("#iva").select(producto.iva);
  cy.get("#btn-guardar").click();
  
});

