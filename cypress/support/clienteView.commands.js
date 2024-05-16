Cypress.Commands.add("clickCardByTitle", (title) => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    const id = `#card-${sanitizedTitle}`;
    cy.get(id).click();
    cy.get("#btn-suscribirse").click();

    cy.get("#select_modalidad").select("MENSUAL");

    const today = new Date().toISOString().split('T')[0];
    cy.get("#input_fecha").type(today);
});

  
  Cypress.Commands.add("actividadesCliente", (actividad) => {
    cy.clickCardByTitle(actividad.title);
  });
  Cypress.Commands.add("recorrer", () => {
    // Hacer clic en el span con el valor 2
    cy.contains('span', '2')
      .should('be.visible')
      .click();
  
    // Esperar 2 segundos
    cy.wait(2000);
  
    // Hacer clic en el span con el valor 1
    cy.contains('span', '1')
      .should('be.visible')
      .click();
  });
  