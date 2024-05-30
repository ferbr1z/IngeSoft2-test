Cypress.Commands.add("clickCardByTitle", (title) => {
    const sanitizedTitle = title.replace(/\s+/g, '-').toLowerCase();
    const id = `#card-${sanitizedTitle}`;
    cy.get(id).click();
    cy.get("#btn-suscribirse").click();

    cy.get("#select_modalidad").select("MENSUAL");

    const today = new Date().toISOString().split('T')[0];
    cy.get("#input_fecha").type(today);
});
Cypress.Commands.add("clickCardByIndex", (index) => {
    cy.get(`.card`).eq(index).click();
    cy.get("#btn-suscribirse").click();

    cy.get("#select_modalidad").select("MENSUAL");

    const today = new Date().toISOString().split('T')[0];
    cy.get("#input_fecha").type(today);
});

  
  Cypress.Commands.add("actividadesCliente", (actividad) => {
    cy.clickCardByTitle(actividad.title);
  });

  Cypress.Commands.add("actividadesClienteIndex", (index) => {
    cy.clickCardByIndex(index);
    cy.get('#btn-confirm-suscription-finish').click();
  });

  Cypress.Commands.add("recorrer", () => {
    //cambie esto para que solo recorra a la segunda página, no hace falta volver
    // Hacer clic en el span con el valor 2
    cy.contains('span', '2')
      .should('be.visible')
      .click();
  
    // Esperar 1 segundos
    cy.wait(1000);
  });
  