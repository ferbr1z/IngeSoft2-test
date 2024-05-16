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

import "../support/login.commands";
import "../support/producto.commands";
import "../support/cliente.commands";
import "../support/proveedor.commands";
import "../support/caja.commands";
import "../support/cajaVenta.commands";
import "../support/cajaCompra.commands";
import "../support/cajaCobroPendiente.commands";
import "../support/reporte.commands";
import "../support/planes.commands";
import "../support/dashboard.commands";
import "../support/clienteView.commands";